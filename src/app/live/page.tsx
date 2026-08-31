"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { getEventStatus, liveTimelineIds, resolveLiveNowId, schedule } from "@/data/schedule";
import { couple } from "@/data/couple";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/components/admin/AdminProvider";

export default function LivePage() {
  const { liveNowId } = useAdmin();
  const nowId = resolveLiveNowId(new Date(), liveNowId);
  const current = schedule.find((event) => event.id === nowId) ?? schedule[0];
  const currentIndex = schedule.findIndex((event) => event.id === nowId);
  const next = nowId === "pre" ? schedule[0] : nowId === "done" ? undefined : schedule[currentIndex + 1];
  const liveEvents = schedule.filter((event) =>
    (liveTimelineIds as readonly string[]).includes(event.id),
  );

  const title =
    nowId === "pre"
      ? "Guests are arriving"
      : nowId === "done"
        ? "Mazel tov!"
        : nowId === "chuppah" || nowId === "kiddushin" || nowId === "badeken"
          ? "Ceremony is beginning!"
          : `${current.title} is happening now`;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-burgundy-dark text-cream-soft">
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
          <ol className="flex gap-3 overflow-x-auto pb-2">
            {liveEvents.map((event) => {
              const status = getEventStatus(event, nowId);
              return (
                <li key={event.id} className="min-w-[140px] flex-1">
                  <div
                    className={cn(
                      "rounded-2xl border px-3 py-4 text-center",
                      status === "happening" && "animate-pulse-gold border-gold bg-burgundy",
                      status === "completed" && "border-white/10 text-cream-soft/50",
                      status === "upcoming" && "border-white/15",
                    )}
                  >
                    <p className="text-[0.65rem] uppercase tracking-[0.16em]">{event.timeLabel}</p>
                    <p className="mt-1 font-display text-xl">{event.title}</p>
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
