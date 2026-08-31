import { Heart, Home, Music, Sparkles, Wine } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { GuideStage } from "@/data/weddingGuide";
import { cn } from "@/lib/utils";

const icons = {
  table: Wine,
  spark: Sparkles,
  veil: Heart,
  canopy: Home,
  ring: Heart,
  blessing: Sparkles,
  glass: Wine,
  door: Home,
  dance: Music,
};

export function GuideStageCard({ stage, nested = false }: { stage: GuideStage; nested?: boolean }) {
  const Icon = icons[stage.icon];
  return (
    <Card hover={false} className={cn("relative overflow-hidden p-6 md:p-10", nested && "border-0 bg-transparent p-0 shadow-none")}>
      <p className="text-xs uppercase tracking-[0.24em] text-gold-ink">
        {stage.number} of 9{stage.hebrew ? ` • ${stage.hebrew}` : ""}
      </p>
      <div className="mt-4 flex items-start gap-4">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold-ink">
          <Icon />
        </span>
        <div>
          <h2 className="font-display text-4xl text-burgundy">{stage.title}</h2>
          <p className="mt-1 text-sm text-ink-muted">{stage.duration}</p>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Block title="What happens" body={stage.whatHappens} />
        <Block title="Why it matters" body={stage.whyItMatters} />
        <Block title="What guests should do" body={stage.whatGuestsDo} />
      </div>
    </Card>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="mb-2 text-xs uppercase tracking-[0.18em] text-gold-ink">{title}</h3>
      <p className="leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
