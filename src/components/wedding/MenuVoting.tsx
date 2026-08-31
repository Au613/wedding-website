"use client";

import { useEffect, useMemo, useState } from "react";
import { seedVotes, voteDishes } from "@/data/menu";
import { readJson, storageKeys, writeJson } from "@/lib/storage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPercent } from "@/lib/utils";

export function MenuVoting() {
  const [votes, setVotes] = useState(seedVotes);
  const [choice, setChoice] = useState<string | null>(null);
  const total = useMemo(() => Object.values(votes).reduce((sum, n) => sum + n, 0), [votes]);

  useEffect(() => {
    const stored = readJson<{ votes: Record<string, number>; choice: string | null }>(storageKeys.menuVotes, {
      votes: seedVotes,
      choice: null,
    });
    setVotes(stored.votes);
    setChoice(stored.choice);
  }, []);

  function submit() {
    if (!choice) return;
    const stored = readJson<{ votes: Record<string, number>; choice: string | null }>(storageKeys.menuVotes, {
      votes: seedVotes,
      choice: null,
    });
    const next = { ...stored.votes };
    if (stored.choice && next[stored.choice] > 0) next[stored.choice] -= 1;
    next[choice] = (next[choice] ?? 0) + 1;
    writeJson(storageKeys.menuVotes, { votes: next, choice });
    setVotes(next);
  }

  return (
    <Card hover={false} className="p-6">
      <h3 className="font-display text-3xl text-burgundy">What are you most excited to eat?</h3>
      <fieldset className="mt-5 space-y-3">
        <legend className="sr-only">Menu vote</legend>
        {voteDishes.map((dish) => (
          <label key={dish.id} className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-gold/20 px-4 py-3">
            <span>
              <input
                type="radio"
                name="menu"
                className="mr-3 accent-[#6F2A3D]"
                checked={choice === dish.id}
                onChange={() => setChoice(dish.id)}
              />
              {dish.name}
              <span className="ml-2 text-sm text-ink-faint">{dish.description}</span>
            </span>
            <span className="text-sm text-burgundy">{formatPercent(((votes[dish.id] ?? 0) / total) * 100)}</span>
          </label>
        ))}
      </fieldset>
      <Button className="mt-5" type="button" onClick={submit} disabled={!choice}>
        Submit vote
      </Button>
    </Card>
  );
}
