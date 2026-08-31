"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { sitePages } from "@/data/sitePages";
import { liveTimelineEvents, type LiveNowId } from "@/data/schedule";
import { cn } from "@/lib/utils";
import { useAdmin } from "./AdminProvider";
import { useScrollCurrentIntoView } from "@/lib/useScrollCurrentIntoView";

const timeline: Array<{ id: LiveNowId; label: string; time?: string }> = [
  { id: "pre", label: "Not started" },
  ...liveTimelineEvents().map((event) => ({ id: event.id, label: event.title, time: event.timeLabel })),
  { id: "done", label: "All done" },
];

export function AdminPanel() {
  const {
    open,
    setOpen,
    pages,
    liveNowId,
    liveMode,
    connectedGuests,
    needsPin,
    unlockAdmin,
    setPageVisible,
    setLiveNowId,
    setLiveMode,
  } = useAdmin();
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const currentRef = useScrollCurrentIntoView(open && !needsPin ? String(liveNowId) : undefined, {
    block: "nearest",
    inline: "nearest",
  });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-burgundy-dark/55 p-4 pt-[8vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-title"
        className="relative mb-10 w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-gold/30 bg-cream shadow-lift"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between bg-burgundy px-6 py-5 text-cream-soft">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-pale">Day-of controls</p>
            <h2 id="admin-title" className="font-display text-3xl">
              Admin
            </h2>
            <p className="mt-1 text-sm text-cream-soft/75">
              Ctrl + Shift + 6 opens this panel; press it again to advance to the next moment
              {connectedGuests ? ` · ${connectedGuests} guest${connectedGuests === 1 ? "" : "s"} connected` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-gold/30 p-2"
            aria-label="Close admin"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {needsPin ? (
          <form
            className="p-8"
            onSubmit={async (event) => {
              event.preventDefault();
              const ok = await unlockAdmin(pin);
              setPinError(!ok);
              if (ok) setPin("");
            }}
          >
            <p className="text-sm text-ink-muted">Enter the admin PIN from ADMIN_SECRET to publish live updates.</p>
            <input
              type="password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              className="mt-4 w-full rounded-full border border-gold/30 bg-cream-soft px-4 py-3"
              autoFocus
            />
            {pinError ? <p className="mt-2 text-sm text-burgundy">That PIN did not match.</p> : null}
            <button type="submit" className="mt-4 rounded-full bg-burgundy px-6 py-2 text-sm uppercase tracking-[0.16em] text-cream-soft">
              Unlock
            </button>
          </form>
        ) : (
          <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
            <section>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.22em] text-gold-ink">Now happening</h3>
                  <p className="mt-1 text-sm text-ink-muted">One current moment. Guests update instantly.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={liveMode}
                  onClick={() => setLiveMode(!liveMode)}
                  className={cn("relative h-6 w-11 shrink-0 rounded-full transition", liveMode ? "bg-burgundy" : "bg-cream-deep")}
                >
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-cream-soft shadow-soft transition", liveMode ? "left-5" : "left-0.5")} />
                </button>
              </div>
              <ol className="max-h-[28rem] space-y-1 overflow-y-auto pr-1">
                {timeline.map((item) => {
                  const active = liveNowId === item.id;
                  return (
                    <li key={String(item.id)} ref={active ? currentRef : undefined}>
                      <button
                        type="button"
                        onClick={() => setLiveNowId(item.id)}
                        className={cn(
                          "flex h-[4.25rem] w-full items-center justify-between gap-3 rounded-2xl border px-4 text-left transition",
                          active
                            ? "border-burgundy bg-burgundy text-cream-soft"
                            : "border-gold/20 bg-cream-soft hover:border-gold",
                        )}
                      >
                        <span className="line-clamp-2 font-medium leading-tight">{item.label}</span>
                        {item.time ? (
                          <span className="shrink-0 text-xs uppercase tracking-[0.14em] opacity-80">{item.time}</span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section>
              <h3 className="text-xs uppercase tracking-[0.22em] text-gold-ink">Show pages</h3>
              <p className="mb-4 mt-1 text-sm text-ink-muted">Hidden pages leave the navigation and are blocked if opened.</p>
              <PageGroup title="Main navigation" group="nav" pages={pages} onToggle={setPageVisible} />
              <PageGroup title="More" group="more" pages={pages} onToggle={setPageVisible} />
              <PageGroup title="Games" group="games" pages={pages} onToggle={setPageVisible} />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function PageGroup({
  title,
  group,
  pages,
  onToggle,
}: {
  title: string;
  group: "nav" | "more" | "games";
  pages: Record<string, boolean>;
  onToggle: (href: string, visible: boolean) => void;
}) {
  return (
    <div className="mb-5">
      <p className="mb-2 text-[0.65rem] uppercase tracking-[0.18em] text-ink-faint">{title}</p>
      <ul className="divide-y divide-gold/15 rounded-2xl border border-gold/20 bg-cream-soft">
        {sitePages
          .filter((page) => page.group === group)
          .map((page) => {
            const on = pages[page.href] !== false;
            return (
              <li key={page.href} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className={cn("text-sm", page.locked && "text-ink-faint")}>{page.label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  disabled={page.locked}
                  onClick={() => onToggle(page.href, !on)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition",
                    on ? "bg-burgundy" : "bg-cream-deep",
                    page.locked && "cursor-not-allowed opacity-60",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-cream-soft shadow-soft transition",
                      on ? "left-5" : "left-0.5",
                    )}
                  />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
