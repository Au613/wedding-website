"use client";

import { useEffect, useMemo, useState } from "react";
import { couple } from "@/data/couple";

function split(ms: number) {
  const clamped = Math.max(0, ms);
  const days = Math.floor(clamped / 86400000);
  const hours = Math.floor((clamped % 86400000) / 3600000);
  const minutes = Math.floor((clamped % 3600000) / 60000);
  const seconds = Math.floor((clamped % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function pad(value: number, size = 2) {
  return String(value).padStart(size, "0");
}

export function Countdown({ target = couple.datetime }: { target?: string }) {
  const date = useMemo(() => new Date(target), [target]);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) {
    return <div className="h-24" aria-hidden />;
  }

  const remaining = date.getTime() - now;
  const parts = remaining >= 0 ? split(remaining) : split(0);
  const marriedDays = remaining < 0 ? Math.floor((now - date.getTime()) / 86400000) : 0;

  const cells = [
    { label: "Days", value: remaining < 0 ? String(marriedDays) : pad(parts.days, parts.days >= 100 ? 3 : 2) },
    { label: "Hrs", value: pad(parts.hours) },
    { label: "Mins", value: pad(parts.minutes) },
    { label: "Secs", value: pad(parts.seconds) },
  ];

  return (
    <div>
      {remaining < 0 ? (
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-gold-pale">Mazel tov — we are married</p>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-3" aria-live="off">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center rounded-full border border-gold/40 bg-cream-soft/90 text-burgundy shadow-soft"
          >
            <span className="font-display text-2xl leading-none tabular-nums">{cell.value}</span>
            <span className="mt-1 text-[0.6rem] uppercase tracking-[0.18em]">{cell.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
