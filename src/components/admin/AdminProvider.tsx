"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultPageVisibility, isPathVisible, sitePages } from "@/data/sitePages";
import { liveNowId as defaultLiveNowId, type LiveNowId } from "@/data/schedule";
import { readJson, storageKeys, writeJson } from "@/lib/storage";

export type AdminState = {
  pages: Record<string, boolean>;
  liveNowId: LiveNowId;
};

const defaults: AdminState = {
  pages: defaultPageVisibility(),
  liveNowId: defaultLiveNowId,
};

const AdminContext = createContext<{
  ready: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  pages: Record<string, boolean>;
  liveNowId: LiveNowId;
  isVisible: (href: string) => boolean;
  setPageVisible: (href: string, visible: boolean) => void;
  setLiveNowId: (id: LiveNowId) => void;
} | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<AdminState>(defaults);

  useEffect(() => {
    const stored = readJson<Partial<AdminState>>(storageKeys.admin, {});
    setState({
      liveNowId: stored.liveNowId ?? defaults.liveNowId,
      pages: { ...defaults.pages, ...stored.pages },
    });
    setReady(true);
  }, []);

  const persist = useCallback((next: AdminState) => {
    setState(next);
    writeJson(storageKeys.admin, next);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.code === "Digit6") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      open,
      setOpen,
      pages: state.pages,
      liveNowId: state.liveNowId,
      isVisible: (href: string) => isPathVisible(href, state.pages),
      setPageVisible: (href: string, visible: boolean) => {
        const page = sitePages.find((item) => item.href === href);
        if (page?.locked) return;
        persist({ ...state, pages: { ...state.pages, [href]: visible } });
      },
      setLiveNowId: (id: LiveNowId) => persist({ ...state, liveNowId: id }),
    }),
    [open, persist, ready, state],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
