"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { weddingGuide, type GuideStage } from "@/data/weddingGuide";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GuideStageCard } from "./GuideStageCard";

export function WeddingGuideStepper() {
  const [active, setActive] = useState(3);
  const stage = useMemo(
    () => weddingGuide.find((item) => item.number === active) ?? weddingGuide[0],
    [active],
  );

  function move(delta: number) {
    setActive((current) => {
      const next = current + delta;
      if (next < 1) return weddingGuide.length;
      if (next > weddingGuide.length) return 1;
      return next;
    });
  }

  return (
    <div>
      <ol className="mb-8 hidden gap-2 overflow-x-auto pb-2 md:flex">
        {weddingGuide.map((item) => (
          <li key={item.id} className="min-w-[7.5rem] flex-1">
            <button
              type="button"
              onClick={() => setActive(item.number)}
              className={cn(
                "w-full rounded-2xl border px-2 py-3 text-center transition",
                active === item.number
                  ? "border-burgundy bg-burgundy text-cream-soft"
                  : "border-gold/25 bg-cream-soft text-ink-muted hover:border-gold",
              )}
            >
              <span className="block font-display text-lg">{item.number}</span>
              <span className="text-[0.65rem] uppercase tracking-[0.12em]">{item.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="relative">
        <GuideStageCard stage={stage} />
        <div className="mt-5 flex items-center justify-between">
          <button type="button" onClick={() => move(-1)} className="rounded-full border border-gold/30 p-2 text-burgundy" aria-label="Previous stage">
            <ChevronLeft />
          </button>
          <p className="text-xs uppercase tracking-[0.2em] text-gold-ink">
            {stage.number} of {weddingGuide.length} • click or use arrows
          </p>
          <button type="button" onClick={() => move(1)} className="rounded-full border border-gold/30 p-2 text-burgundy" aria-label="Next stage">
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:hidden">
        {weddingGuide.map((item) => (
          <MobileStage key={item.id} stage={item} open={active === item.number} onOpen={() => setActive(item.number)} />
        ))}
      </div>
    </div>
  );
}

function MobileStage({
  stage,
  open,
  onOpen,
}: {
  stage: GuideStage;
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <Card hover={false} className="p-5">
      <button type="button" onClick={onOpen} className="flex w-full items-center justify-between text-left">
        <span className="font-display text-2xl text-burgundy">
          {stage.number}. {stage.title}
        </span>
      </button>
      {open ? <div className="mt-4"><GuideStageCard stage={stage} nested /></div> : null}
    </Card>
  );
}
