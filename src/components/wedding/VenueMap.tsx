"use client";

import { useState } from "react";
import { venue } from "@/data/venue";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function VenueMap() {
  const [active, setActive] = useState(venue.pins[3]?.id ?? venue.pins[0].id);
  const pin = venue.pins.find((item) => item.id === active) ?? venue.pins[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card hover={false} className="p-5">
        <h2 className="font-display text-3xl text-burgundy">Legend</h2>
        <ol className="mt-4 space-y-2">
          {venue.pins.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left",
                  active === item.id ? "bg-burgundy text-cream-soft" : "hover:bg-cream",
                )}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-burgundy text-xs text-cream-soft">
                  {item.number}
                </span>
                {item.name}
              </button>
            </li>
          ))}
        </ol>
      </Card>
      <Card hover={false} className="relative min-h-[420px] overflow-hidden bg-[#e7efe4] p-0">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, #cfe0c4, transparent 40%), radial-gradient(circle at 70% 60%, #d7c4a3, transparent 35%), linear-gradient(#d7e6f0, #e9efd8)",
          }}
        />
        <svg className="absolute inset-6 text-gold/40" viewBox="0 0 400 260" aria-hidden>
          <rect x="40" y="70" width="140" height="90" rx="16" fill="#f7f1e6" stroke="currentColor" />
          <rect x="210" y="40" width="130" height="80" rx="18" fill="#f4eee4" stroke="currentColor" />
          <ellipse cx="120" cy="200" rx="70" ry="24" fill="#cfe3c8" />
          <path d="M40 40c40 10 60-10 120 8" stroke="#8a6e3a" fill="none" />
        </svg>
        {venue.pins.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={cn(
              "absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs text-cream-soft shadow-lift",
              active === item.id ? "bg-gold-ink animate-pulse-gold" : "bg-burgundy",
            )}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            aria-label={item.name}
          >
            {item.number}
          </button>
        ))}
        <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-cream-soft/95 p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.18em] text-gold-ink">Pin {pin.number}</p>
          <h3 className="font-display text-2xl text-burgundy">{pin.name}</h3>
          <p className="text-sm text-ink-muted">{pin.description}</p>
        </div>
      </Card>
    </div>
  );
}
