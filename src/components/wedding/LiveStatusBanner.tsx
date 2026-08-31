"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { getEventStatus, liveTimelineEvents, resolveLiveNowId, resolveLiveStripId } from "@/data/schedule";
import { useAdmin } from "@/components/admin/AdminProvider";

export function LiveStatusBanner() {
  const { liveNowId, isVisible } = useAdmin();
  const nowId = resolveLiveStripId(resolveLiveNowId(new Date(), liveNowId));
  const liveEvents = liveTimelineEvents();
  const current = liveEvents.find((event) => event.id === nowId) ?? liveEvents[0];
  const currentIndex = liveEvents.findIndex((event) => event.id === nowId);
  const next = nowId === "done" || nowId === "pre" ? (nowId === "pre" ? liveEvents[0] : undefined) : liveEvents[currentIndex + 1];
  const status = nowId === "pre" || nowId === "done" ? nowId : getEventStatus(current, nowId, liveEvents);

  const headline =
    nowId === "pre"
      ? "The day has not started yet"
      : nowId === "done"
        ? "Mazel tov — the night is complete"
        : next
          ? `Up next: ${next.title} • estimated ${next.timeLabel}`
          : `${current.title} is the last event`;

  return (
    <div className="rounded-2xl bg-burgundy px-5 py-4 text-cream-soft shadow-lift">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-pale">
        {status === "happening" ? "Happening now" : "Live companion"}
      </p>
      <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-2xl">{headline}</p>
        {isVisible("/live") ? (
          <Link
            href="/live"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cream-soft px-5 py-2 text-xs uppercase tracking-[0.16em] text-burgundy"
          >
            <MapPin className="h-4 w-4" />
            {nowId === "pre" || nowId === "done" ? "Open live mode" : `Move to ${current.title} now`}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
