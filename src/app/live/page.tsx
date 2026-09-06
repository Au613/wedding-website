"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Flower2, GlassWater, Heart, MapPin, Moon, Music, Sparkles, Users, Utensils } from "lucide-react";
import { getEventStatus, liveTimelineEvents, resolveLiveNowId, resolveLiveStripId, type EventStatus, type ScheduleEvent } from "@/data/schedule";
import { getEventDetail } from "@/data/eventDetails";
import { couple } from "@/data/couple";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/components/admin/AdminProvider";
import { TextWithBrachotLink } from "@/components/wedding/TextWithBrachotLink";

const icons = {
  glass: GlassWater,
  heart: Heart,
  users: Users,
  spark: Sparkles,
  music: Music,
  utensils: Utensils,
  moon: Moon,
  flower: Flower2,
};

const groups: Array<{ label: string; ids: string[]; tone: "gold" | "burgundy" }> = [
  { label: "Welcome", ids: ["arrive", "kabbalat-panim", "tisch", "tisch-speaking", "badeken", "processional"], tone: "gold" },
  { label: "Ceremony", ids: ["chuppah"], tone: "burgundy" },
  { label: "Reception", ids: ["yichud", "cocktail", "dancing", "dinner", "late-night", "sheva-brachot"], tone: "gold" },
];

function isWarm(id: string) {
  return id === "cocktail" || id === "chuppah" || id === "dinner" || id === "dancing";
}

function statusCopy(status: EventStatus, isNext: boolean) {
  if (status === "completed") return "Completed";
  if (status === "happening") return "Happening now";
  if (isNext) return "Up next";
  return "Upcoming";
}

export default function LivePage() {
  const { liveNowId } = useAdmin();
  const nowId = resolveLiveStripId(resolveLiveNowId(new Date(), liveNowId));
  const liveEvents = liveTimelineEvents();
  const current = liveEvents.find((event) => event.id === nowId) ?? liveEvents[0];
  const currentIndex = liveEvents.findIndex((event) => event.id === nowId);
  const next = nowId === "pre" ? liveEvents[0] : nowId === "done" ? undefined : liveEvents[currentIndex + 1];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<"timeline" | "details">("timeline");

  useEffect(() => {
    setSelectedId(null);
  }, [nowId]);

  const viewedId =
    selectedId ?? (nowId === "pre" || nowId === "done" ? liveEvents[0]?.id : nowId);
  const viewed = liveEvents.find((event) => event.id === viewedId) ?? current;
  const viewedStatus = viewed ? getEventStatus(viewed, nowId, liveEvents) : "upcoming";
  const detail = viewed ? getEventDetail(viewed.id) : null;

  const title =
    nowId === "pre"
      ? "Guests are arriving"
      : nowId === "done"
        ? "Mazel tov!"
        : nowId === "chuppah" || nowId === "processional"
          ? "Ceremony is beginning!"
          : `${current.title} is happening now`;

  const eyebrow =
    viewedStatus === "happening"
      ? "What's happening now"
      : viewedStatus === "completed"
        ? "Already happened"
        : "Coming up";

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-burgundy-dark text-cream-soft [color-scheme:dark]">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${couple.photos.live})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-burgundy-dark/70 to-black/30" />
      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-site flex-col px-3 py-3 md:px-8 md:py-5">
        <div className="shrink-0 text-center">
          <h1 className="font-display text-3xl leading-tight md:text-5xl">{title}</h1>
          <p className="mt-1 text-sm text-cream-soft/80">
            {nowId === "pre" || nowId === "done" ? couple.names : `${current.title} • ${current.location}`}
          </p>
          {nowId !== "pre" && nowId !== "done" ? (
            <Link
              href="/venue"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-burgundy px-5 py-2.5 text-xs uppercase tracking-[0.18em] shadow-lift md:px-6"
            >
              <MapPin className="h-4 w-4" />
              Move to the {current.title.toLowerCase()} now
            </Link>
          ) : null}
        </div>

        <div className="mt-3 shrink-0 rounded-2xl bg-burgundy px-4 py-2 text-center text-[0.7rem] uppercase tracking-[0.16em] md:text-sm">
          {nowId === "done"
            ? "The night is complete"
            : next
              ? `Up next: ${next.title} • est. ${next.timeLabel}`
              : "This is the last event of the night"}
        </div>

        <div className="mt-3 flex shrink-0 rounded-full border border-gold/30 bg-black/40 p-1 md:hidden">
          <button
            type="button"
            onClick={() => setMobileTab("timeline")}
            className={cn(
              "flex-1 rounded-full py-2 text-[0.7rem] uppercase tracking-[0.16em]",
              mobileTab === "timeline" ? "bg-burgundy text-cream-soft" : "text-gold-pale",
            )}
          >
            Timeline
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("details")}
            className={cn(
              "flex-1 rounded-full py-2 text-[0.7rem] uppercase tracking-[0.16em]",
              mobileTab === "details" ? "bg-burgundy text-cream-soft" : "text-gold-pale",
            )}
          >
            This moment
          </button>
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-hidden md:grid md:grid-cols-[minmax(22rem,30rem)_minmax(0,1fr)] md:gap-5">
          <div
            className={cn(
              "flex h-full min-h-0 w-[200%] transition-transform duration-500 ease-[cubic-bezier(0.22,0.75,0.28,1)] motion-reduce:transition-none md:contents",
              mobileTab === "details" ? "-translate-x-1/2 md:translate-x-0" : "translate-x-0",
            )}
          >
          <nav
            className="live-timeline flex h-full w-1/2 min-h-0 shrink-0 flex-col gap-3 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/35 p-4 backdrop-blur-sm md:h-full md:w-auto md:min-w-0 md:p-5"
          >
            {groups.map((group) => {
              const items = group.ids
                .map((id) => liveEvents.find((event) => event.id === id))
                .filter((event): event is ScheduleEvent => Boolean(event));
              return (
                <section
                  key={group.label}
                  className="flex min-h-0 flex-col overflow-hidden"
                  style={{ flex: items.length }}
                >
                  <p
                    className={cn(
                      "mb-1.5 shrink-0 rounded-full px-3 py-1 text-center text-[0.6rem] uppercase tracking-[0.18em]",
                      group.tone === "gold" ? "bg-gold/25 text-gold-pale" : "bg-burgundy text-cream-soft",
                    )}
                  >
                    {group.label}
                  </p>
                  <ol className="relative flex min-h-0 flex-1 flex-col border-l border-gold/25 pl-4">
                    {items.map((event) => {
                      const status = getEventStatus(event, nowId, liveEvents);
                      const selected = event.id === viewed?.id;
                      const isNext = next?.id === event.id;
                      const warm = isWarm(event.id);
                      return (
                        <li key={event.id} className="relative flex min-h-0 flex-1 items-stretch pb-1 last:pb-0">
                          <span
                            className={cn(
                              "absolute -left-[1.15rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border",
                              status === "happening" && "border-cream-soft bg-cream-soft",
                              status === "completed" && "border-gold bg-gold",
                              status === "upcoming" && "border-gold/50 bg-transparent",
                            )}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedId(event.id);
                              setMobileTab("details");
                            }}
                            aria-pressed={selected}
                            className={cn(
                              "flex h-full min-h-0 w-full items-center justify-between gap-3 rounded-xl px-3 py-1 text-left transition",
                              warm && "bg-gold-pale/20",
                              status === "happening" && "border border-gold bg-burgundy/80",
                              status === "happening" && warm && "bg-gold-pale/35",
                              status !== "happening" && "border border-transparent",
                              selected && status !== "happening" && "border-gold/70",
                              status === "completed" && !selected && "text-cream-soft/70",
                            )}
                          >
                            <span className="min-w-0">
                              <span className="block text-[0.55rem] uppercase tracking-[0.14em] text-gold-pale">
                                {event.timeLabel}
                              </span>
                              <span className="block truncate font-display text-lg leading-tight">{event.title}</span>
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-1 text-[0.55rem] uppercase tracking-[0.12em] text-gold-pale">
                              {status === "completed" ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                              {statusCopy(status, isNext)}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            })}
          </nav>

          {viewed && detail ? (
            <div className="flex h-full w-1/2 min-h-0 shrink-0 flex-col md:w-auto md:min-w-0">
              <LiveDetail event={viewed} detail={detail} eyebrow={eyebrow} />
            </div>
          ) : (
            <div className="hidden h-full w-1/2 min-h-0 md:block md:w-auto" />
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveDetail({
  event,
  detail,
  eyebrow,
}: {
  event: ScheduleEvent;
  detail: NonNullable<ReturnType<typeof getEventDetail>>;
  eyebrow: string;
}) {
  const Icon = icons[event.icon];
  return (
    <section className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/45 p-4 backdrop-blur-sm md:p-6">
      <p className="shrink-0 text-[0.65rem] uppercase tracking-[0.22em] text-gold-pale">{eyebrow}</p>
      <div className="mt-3 flex shrink-0 items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-pale">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-3xl leading-tight md:text-4xl">{event.title}</h2>
          <p className="mt-1 text-sm text-cream-soft/75">
            {detail.duration} • {event.location}
          </p>
        </div>
      </div>
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-3">
        <DetailBlock title="What happens" body={detail.whatHappens} />
        <DetailBlock title="Why it matters" body={detail.whyItMatters} />
        <DetailBlock title="What guests should do" body={detail.whatGuestsDo} />
      </div>
    </section>
  );
}

function DetailBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-h-0">
      <h3 className="mb-1.5 text-xs uppercase tracking-[0.18em] text-gold">{title}</h3>
      <TextWithBrachotLink
        text={body}
        className="text-sm leading-snug text-cream-soft/85 md:leading-relaxed"
        linkClassName="text-gold-pale underline decoration-gold/70 underline-offset-4"
      />
    </div>
  );
}
