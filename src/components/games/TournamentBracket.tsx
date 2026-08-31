"use client";

import { useEffect, useState } from "react";
import { bracketRounds } from "@/data/games";
import { addPoints, readJson, storageKeys, writeJson } from "@/lib/storage";
import { Card } from "@/components/ui/card";

export function TournamentBracket() {
  const [picks, setPicks] = useState<Record<string, string>>({});

  useEffect(() => {
    setPicks(readJson(storageKeys.bracket, {}));
  }, []);

  function pick(matchId: string, winner: string) {
    const next = { ...picks, [matchId]: winner };
    setPicks(next);
    writeJson(storageKeys.bracket, next);
    if (matchId === "f1") addPoints("You", 20, "Bracket");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {bracketRounds.map((round) => (
        <div key={round.id}>
          <h3 className="mb-3 font-display text-2xl text-burgundy">{round.name}</h3>
          <div className="space-y-3">
            {round.matches.map((match) => (
              <Card key={match.id} hover={false} className="p-4">
                {[match.a, match.b].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => pick(match.id, option)}
                    className={`mb-2 block w-full rounded-xl px-3 py-2 text-left last:mb-0 ${
                      picks[match.id] === option ? "bg-burgundy text-cream-soft" : "bg-cream"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
