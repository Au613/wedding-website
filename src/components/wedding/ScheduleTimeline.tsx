"use client";

import { GlassWater, Heart, Moon, Music, Sparkles, Users, Utensils, Flower2 } from "lucide-react";
import { getEventStatus, resolveLiveNowId, schedule, type ScheduleEvent } from "@/data/schedule";
import { Card } from "@/components/ui/card";
import { useAdmin } from "@/components/admin/AdminProvider";
import { cn } from "@/lib/utils";
import { useScrollCurrentIntoView } from "@/lib/useScrollCurrentIntoView";

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

export function ScheduleTimeline({ events = schedule }: { events?: ScheduleEvent[] }) {
  const { liveNowId, ready } = useAdmin();
  const nowId = resolveLiveNowId(new Date(), liveNowId);
  const scrollId = nowId === "pre" ? events[0]?.id : nowId === "done" ? events[events.length - 1]?.id : nowId;
  const currentRef = useScrollCurrentIntoView(ready ? scrollId : undefined, { block: "center", inline: "nearest" });

  return (
    <ol className="space-y-4">
      {events.map((event) => {
        const Icon = icons[event.icon];
        const status = getEventStatus(event, nowId, events);
        return (
          <li key={event.id} ref={event.id === scrollId ? currentRef : undefined}>
            <Card
              className={cn(
                "grid gap-4 p-5 md:grid-cols-[140px_1fr]",
                status === "happening" && "border-burgundy ring-1 ring-burgundy/20",
                status === "completed" && "opacity-60",
              )}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gold-ink">{event.timeLabel}</p>
                <span className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-burgundy">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-3 text-[0.65rem] uppercase tracking-[0.16em] text-ink-faint">{status}</p>
              </div>
              <div>
                <h3 className="font-display text-2xl text-burgundy">{event.title}</h3>
                <p className="text-sm text-ink-faint">{event.location}</p>
                <p className="mt-2 text-ink-muted">{event.description}</p>
              </div>
            </Card>
          </li>
        );
      })}
    </ol>
  );
}
