"use client";

import Image from "next/image";
import { useState } from "react";
import { venue } from "@/data/venue";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function VenueMap() {
  const [active, setActive] = useState(venue.pins[3]?.id ?? venue.pins[0].id);
  const pin = venue.pins.find((item) => item.id === active) ?? venue.pins[0];

  return (
    <div className="grid min-h-0 flex-1 grid-rows-[1fr_auto] gap-3 overflow-hidden lg:grid-cols-[210px_minmax(0,1fr)] lg:grid-rows-1 lg:gap-4">
      <Card hover={false} className="order-2 flex min-h-0 flex-col p-3 lg:order-1 lg:p-4">
        <h2 className="font-display text-2xl leading-none text-burgundy lg:text-3xl">Legend</h2>
        <ol className="mt-2 grid grid-cols-2 gap-1.5 lg:mt-3 lg:grid-cols-1 lg:gap-2">
          {venue.pins.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  "flex min-h-[2.6rem] w-full items-center gap-2 rounded-2xl px-2 py-1.5 text-left text-sm lg:min-h-[2.85rem] lg:gap-3 lg:px-3",
                  active === item.id ? "bg-burgundy text-cream-soft" : "hover:bg-cream",
                )}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-burgundy text-[0.65rem] text-cream-soft">
                  {item.number}
                </span>
                <span className="leading-tight">{item.name}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-3 hidden rounded-2xl bg-cream p-3 lg:block">
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gold-ink">Pin {pin.number}</p>
          <h3 className="font-display text-xl leading-tight text-burgundy">{pin.name}</h3>
          <p className="mt-1 text-sm text-ink-muted">{pin.description}</p>
        </div>
      </Card>
      <Card hover={false} className="relative order-1 min-h-0 overflow-hidden bg-cream-deep p-0 lg:order-2">
        <Image
          src={venue.mapImage}
          alt="Austin and Alexa wedding map of Felton Farm and Smith Barn"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
        />
      </Card>
    </div>
  );
}
