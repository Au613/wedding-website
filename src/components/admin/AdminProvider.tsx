"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { defaultPageVisibility, isPathVisible, sitePages } from "@/data/sitePages";
import { liveNowId as defaultLiveNowId, nextLiveStep, type LiveNowId } from "@/data/schedule";
import { storyMilestones as defaultStory, type StoryMilestone } from "@/data/story";
import { ABLY_CHANNEL, ablyEvents } from "@/lib/ably-events";
import { loadAbly } from "@/lib/ably-browser";
import type { WeddingSnapshot } from "@/lib/wedding-state";

export type AdminState = {
  pages: Record<string, boolean>;
  liveNowId: LiveNowId;
  liveMode: boolean;
};

const defaults: AdminState = {
  pages: defaultPageVisibility(),
  liveNowId: defaultLiveNowId,
  liveMode: true,
};

const AdminContext = createContext<{
  ready: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  storyOpen: boolean;
  setStoryOpen: (open: boolean) => void;
  pages: Record<string, boolean>;
  liveNowId: LiveNowId;
  liveMode: boolean;
  connectedGuests: number;
  needsPin: boolean;
  milestones: StoryMilestone[];
  unlockAdmin: (pin: string) => Promise<boolean>;
  saveStory: (items: StoryMilestone[]) => Promise<boolean>;
  isVisible: (href: string) => boolean;
  setPageVisible: (href: string, visible: boolean) => void;
  setLiveNowId: (id: LiveNowId) => void;
  setLiveMode: (liveMode: boolean) => void;
} | null>(null);

function applySnapshot(data: WeddingSnapshot): AdminState {
  return {
    liveNowId: data.currentStep,
    liveMode: data.liveMode,
    pages: { ...defaults.pages, ...data.pages, "/": true },
  };
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [needsPin, setNeedsPin] = useState(true);
  const [connectedGuests, setConnectedGuests] = useState(0);
  const [state, setState] = useState<AdminState>(defaults);
  const [milestones, setMilestones] = useState<StoryMilestone[]>(defaultStory);
  const channelName = useRef(ABLY_CHANNEL);
  const openRef = useRef(open);
  const storyOpenRef = useRef(storyOpen);
  const needsPinRef = useRef(needsPin);
  const liveNowIdRef = useRef(state.liveNowId);
  openRef.current = open;
  storyOpenRef.current = storyOpen;
  needsPinRef.current = needsPin;
  liveNowIdRef.current = state.liveNowId;

  const applyRemote = useCallback((data: WeddingSnapshot) => {
    channelName.current = data.channel || ABLY_CHANNEL;
    setState(applySnapshot(data));
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [stateRes, sessionRes, storyRes] = await Promise.all([
          fetch("/api/wedding/state", { cache: "no-store" }),
          fetch("/api/admin/session", { cache: "no-store" }),
          fetch("/api/story", { cache: "no-store" }),
        ]);
        if (stateRes.ok) {
          const data = (await stateRes.json()) as WeddingSnapshot;
          if (!cancelled) applyRemote(data);
        }
        if (sessionRes.ok) {
          const session = (await sessionRes.json()) as { ok?: boolean };
          if (!cancelled) setNeedsPin(!session.ok);
        }
        if (storyRes.ok) {
          const story = (await storyRes.json()) as { milestones?: StoryMilestone[] };
          if (!cancelled && Array.isArray(story.milestones) && story.milestones.length) {
            setMilestones(story.milestones);
          }
        }
      } catch {
        // Keep static defaults if Neon is unreachable.
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [applyRemote]);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "hidden") return;
      void fetch("/api/wedding/state", { cache: "no-store" })
        .then((response) => (response.ok ? response.json() : null))
        .then((data: WeddingSnapshot | null) => {
          if (data?.currentStep) applyRemote(data);
        })
        .catch(() => undefined);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [applyRemote, ready]);

  useEffect(() => {
    if (!ready) return;
    let closed = false;
    let realtime: { close: () => void } | null = null;

    (async () => {
      const Ably = await loadAbly();
      if (closed) return;
      const client = new Ably.Realtime({
        authUrl: "/api/ably/token",
      });
      realtime = client;
      const channel = client.channels.get(channelName.current);

      const listen = () => {
        channel.subscribe(ablyEvents.weddingStateChanged, (message) => {
          const data = message.data as { currentStep?: LiveNowId; liveMode?: boolean };
          setState((prev) => ({
            ...prev,
            liveNowId: data.currentStep ?? prev.liveNowId,
            liveMode: data.liveMode ?? prev.liveMode,
          }));
        });

        channel.subscribe(ablyEvents.pageVisibilityChanged, (message) => {
          const data = message.data as { slug?: string; visible?: boolean };
          if (!data.slug || typeof data.visible !== "boolean") return;
          setState((prev) => ({
            ...prev,
            pages: { ...prev.pages, [data.slug as string]: data.visible as boolean, "/": true },
          }));
        });

        channel.subscribe(ablyEvents.storyChanged, (message) => {
          if (storyOpenRef.current) return;
          const data = message.data as { milestones?: StoryMilestone[] };
          if (Array.isArray(data.milestones)) setMilestones(data.milestones);
        });
      };

      if (client.connection.state === "connected") listen();
      else client.connection.once("connected", listen);

      const refreshPresence = async () => {
        try {
          const members = await channel.presence.get();
          setConnectedGuests(members.length);
        } catch {
          // Presence is optional if the token cannot enter.
        }
      };

      try {
        await channel.presence.enter({ role: "guest" });
      } catch {
        // Ignore if this credential cannot use presence.
      }
      channel.presence.subscribe(() => {
        void refreshPresence();
      });
      await refreshPresence();
    })();

    return () => {
      closed = true;
      realtime?.close();
    };
  }, [ready]);

  const postAdmin = useCallback(async (url: string, body: unknown) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.status === 401) {
      setNeedsPin(true);
      setOpen(true);
      return false;
    }
    if (!response.ok) return false;
    const data = (await response.json()) as WeddingSnapshot;
    if (data.currentStep) applyRemote(data);
    return true;
  }, [applyRemote]);

  const saveStory = useCallback(async (items: StoryMilestone[]) => {
    const response = await fetch("/api/admin/story", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ milestones: items }),
    });
    if (response.status === 401) {
      setNeedsPin(true);
      setStoryOpen(true);
      return false;
    }
    if (!response.ok) return false;
    const data = (await response.json()) as { milestones?: StoryMilestone[] };
    if (Array.isArray(data.milestones)) setMilestones(data.milestones);
    return true;
  }, []);

  const unlockAdmin = useCallback(async (pin: string) => {
    const response = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    const ok = response.ok;
    setNeedsPin(!ok);
    return ok;
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.code === "Digit6") {
        event.preventDefault();
        setStoryOpen(false);
        if (!openRef.current) {
          setOpen(true);
          return;
        }
        if (needsPinRef.current) return;
        const next = nextLiveStep(liveNowIdRef.current);
        if (next === liveNowIdRef.current) return;
        setState((prev) => ({ ...prev, liveNowId: next, liveMode: true }));
        void postAdmin("/api/admin/wedding-state", { currentStep: next });
      }
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.code === "Digit7") {
        event.preventDefault();
        setOpen(false);
        setStoryOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setOpen(false);
        setStoryOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [postAdmin]);

  const value = useMemo(
    () => ({
      ready,
      open,
      setOpen,
      storyOpen,
      setStoryOpen,
      pages: state.pages,
      liveNowId: state.liveNowId,
      liveMode: state.liveMode,
      connectedGuests,
      needsPin,
      milestones,
      unlockAdmin,
      saveStory,
      isVisible: (href: string) => isPathVisible(href, state.pages),
      setPageVisible: (href: string, visible: boolean) => {
        const page = sitePages.find((item) => item.href === href);
        if (page?.locked) return;
        void postAdmin("/api/admin/pages", { slug: href, visible });
      },
      setLiveNowId: (id: LiveNowId) => {
        setState((prev) => ({ ...prev, liveNowId: id, liveMode: true }));
        void postAdmin("/api/admin/wedding-state", { currentStep: id });
      },
      setLiveMode: (liveMode: boolean) => {
        void postAdmin("/api/admin/wedding-state", { liveMode });
      },
    }),
    [connectedGuests, milestones, needsPin, open, postAdmin, ready, saveStory, state, storyOpen, unlockAdmin],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
