"use client";

import { useEffect, useMemo, useState } from "react";
import { bingoSquares } from "@/data/games";
import { addPoints, readJson, storageKeys, writeJson } from "@/lib/storage";
import { cn } from "@/lib/utils";

export function BingoBoard() {
  const squares = useMemo(() => {
    const cells = [...bingoSquares];
    cells.splice(12, 0, "FREE SPACE");
    return cells.slice(0, 25);
  }, []);
  const [marked, setMarked] = useState<number[]>([12]);

  useEffect(() => {
    setMarked(readJson<number[]>(storageKeys.bingo, [12]));
  }, []);

  function toggle(index: number) {
    if (index === 12) return;
    const next = marked.includes(index) ? marked.filter((item) => item !== index) : [...marked, index];
    setMarked(next);
    writeJson(storageKeys.bingo, next);
    if (next.length === 25) addPoints("You", 50, "Bingo");
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {squares.map((square, index) => {
        const on = marked.includes(index);
        return (
          <button
            key={square + index}
            type="button"
            onClick={() => toggle(index)}
            className={cn(
              "flex min-h-20 items-center justify-center rounded-2xl border p-2 text-center text-[0.7rem] uppercase tracking-[0.08em] md:min-h-24 md:text-xs",
              on ? "border-burgundy bg-burgundy text-cream-soft" : "border-gold/30 bg-cream-soft text-ink",
            )}
          >
            {square}
          </button>
        );
      })}
    </div>
  );
}
