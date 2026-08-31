"use client";

import { Volume2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { sevenBrachot } from "@/data/sevenBrachot";
import { Botanical } from "@/components/site/Botanical";

export function SevenBrachotList() {
  return (
    <div className="relative">
      <Botanical className="absolute -left-6 -top-8 h-28 w-20 opacity-50" />
      <Accordion type="single" collapsible defaultValue="1" className="rounded-card border border-gold/20 bg-cream-soft px-4 md:px-8">
        {sevenBrachot.map((bracha) => (
          <AccordionItem key={bracha.id} value={String(bracha.id)}>
            <AccordionTrigger>
              <span className="flex items-center gap-4">
                <span className="font-display text-2xl text-gold-ink">{bracha.id}</span>
                <span>
                  <span className="block font-display text-xl text-burgundy">{bracha.title}</span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-ink-faint">{bracha.theme}</span>
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p dir="rtl" lang="he" className="mb-3 whitespace-normal break-words font-display text-2xl leading-loose text-burgundy">
                {bracha.hebrew}
              </p>
              <p className="whitespace-normal break-words italic leading-relaxed text-ink-muted">{bracha.transliteration}</p>
              <p className="mt-3">{bracha.explanation}</p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gold-ink"
                onClick={() => {
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    const utter = new SpeechSynthesisUtterance(bracha.transliteration);
                    window.speechSynthesis.speak(utter);
                  }
                }}
              >
                <Volume2 className="h-4 w-4" />
                Hear transliteration
              </button>
              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.16em] text-ink-faint">Hebrew marked for review</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
