"use client";

import { useEffect, useState } from "react";
import { readJson, storageKeys } from "@/lib/storage";
import { Card } from "@/components/ui/card";

type Row = { name: string; points: number; badges: string[] };

const seed: Row[] = [
  { name: "Maya Gold", points: 120, badges: ["Trivia"] },
  { name: "Noah Stein", points: 90, badges: ["Bingo"] },
  { name: "Rebecca Cohen", points: 70, badges: ["Bracket"] },
];

export function Leaderboard() {
  const [rows, setRows] = useState(seed);
  useEffect(() => {
    const stored = readJson<Row[]>(storageKeys.leaderboard, []);
    setRows([...seed, ...stored].sort((a, b) => b.points - a.points).slice(0, 8));
  }, []);

  return (
    <Card hover={false} className="p-6">
      <h3 className="font-display text-3xl text-burgundy">Leaderboard</h3>
      <ol className="mt-4 space-y-3">
        {rows.map((row, index) => (
          <li key={row.name + index} className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3">
            <span>
              <span className="mr-3 text-gold-ink">{index + 1}</span>
              {row.name}
              <span className="ml-2 text-xs uppercase tracking-[0.12em] text-ink-faint">{row.badges.join(" • ")}</span>
            </span>
            <span className="text-burgundy">{row.points} pts</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
