"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import { Reveal } from "@/components/site/Reveal";

export function StoryTimeline() {
  const { milestones } = useAdmin();

  return (
    <ol className="relative ml-3 border-l border-gold/40 pl-8">
      {milestones.map((item) => (
        <Reveal key={item.id}>
          <li className="mb-10">
            <span className="absolute -left-2 mt-1 h-4 w-4 rounded-full border border-gold bg-cream-soft" />
            <p className="text-xs uppercase tracking-[0.2em] text-gold-ink">{item.date}</p>
            <h3 className="font-display text-2xl text-burgundy">{item.title}</h3>
            {item.photo ? (
              <div className="relative mt-3 overflow-hidden rounded-2xl bg-cream-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.photo} alt={item.title} className="h-52 w-full object-cover" />
              </div>
            ) : null}
            <p className="mt-3 text-ink-muted">{item.caption}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
