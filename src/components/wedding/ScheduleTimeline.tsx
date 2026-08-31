import { GlassWater, Heart, Moon, Music, Sparkles, Users, Utensils, Flower2 } from "lucide-react";
import { schedule, type ScheduleEvent } from "@/data/schedule";
import { Card } from "@/components/ui/card";

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
  return (
    <ol className="space-y-4">
      {events.map((event) => {
        const Icon = icons[event.icon];
        return (
          <li key={event.id}>
            <Card className="grid gap-4 p-5 md:grid-cols-[140px_1fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gold-ink">{event.timeLabel}</p>
                <span className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-burgundy">
                  <Icon className="h-4 w-4" />
                </span>
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
