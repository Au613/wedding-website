"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { getEventStatus, liveTimelineEvents, resolveLiveNowId, resolveLiveStripId } from "@/data/schedule";
import { couple } from "@/data/couple";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/components/admin/AdminProvider";
import { useScrollCurrentIntoView } from "@/lib/useScrollCurrentIntoView";

export default function LivePage() {
  const { liveNowId, ready } = useAdmin();
  const nowId = resolveLiveStripId(resolveLiveNowId(new Date(), liveNowId));
  const liveEvents = liveTimelineEvents();
  const current = liveEvents.find((event) => event.id === nowId) ?? liveEvents[0];
  const currentIndex = liveEvents.findIndex((event) => event.id === nowId);
  const next = nowId === "pre" ? liveEvents[0] : nowId === "done" ? undefined : liveEvents[currentIndex + 1];
  const scrollId =
    nowId === "pre" ? liveEvents[0]?.id : nowId === "done" ? liveEvents[liveEvents.length - 1]?.id : nowId;
  const currentRef = useScrollCurrentIntoView(ready ? scrollId : undefined, { block: "nearest", inline: "center" });

  const title =
    nowId === "pre"
      ? "Guests are arriving"
      : nowId === "done"
        ? "Mazel tov!"
        : nowId === "chuppah" || nowId === "kiddushin" || nowId === "badeken"
          ? "Ceremony is beginning!"
          : `${current.title} is happening now`;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-burgundy-dark text-cream-soft [color-scheme:dark]">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${couple.photos.live})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-burgundy-dark/70 to-black/30" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-site flex-col justify-between px-4 py-10 md:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-pale">Live wedding mode</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">{title}</h1>
          <p className="mt-3 text-cream-soft/80">
            {nowId === "pre" || nowId === "done"
              ? couple.names
              : `${current.title} • ${current.location}`}
          </p>
          {nowId !== "pre" && nowId !== "done" ? (
            <Link
              href="/venue"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-burgundy px-8 py-4 text-sm uppercase tracking-[0.18em] shadow-lift"
            >
              <MapPin className="h-4 w-4" />
              Move to the {current.title.toLowerCase()} now
            </Link>
          ) : null}
        </div>
        <div>
          <div className="mb-4 rounded-2xl bg-burgundy px-4 py-3 text-center text-sm uppercase tracking-[0.16em]">
            {nowId === "done"
              ? "The night is complete"
              : next
                ? `Up next: ${next.title} • est. ${next.timeLabel}`
                : "This is the last event of the night"}
          </div>
          <ol className="live-timeline flex gap-3 overflow-x-auto bg-transparent pb-2">
            {liveEvents.map((event) => {
              const status = getEventStatus(event, nowId, liveEvents);
              return (
                <li
                  key={event.id}
                  ref={event.id === scrollId ? currentRef : undefined}
                  className="flex min-w-[10.5rem] flex-1"
                >
                  <div
                    className={cn(
                      "flex h-[9.25rem] w-full flex-col justify-between rounded-2xl border px-3 py-4 text-center",
                      status === "happening" && "animate-pulse-gold border-gold bg-burgundy",
                      status === "completed" && "border-white/10 text-cream-soft/50",
                      status === "upcoming" && "border-white/15",
                    )}
                  >
                    <p className="text-[0.65rem] uppercase tracking-[0.16em]">{event.timeLabel}</p>
                    <p className="font-display text-xl leading-tight">{event.title}</p>
                    <p className="text-[0.65rem] uppercase tracking-[0.12em] text-gold-pale">{status}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
