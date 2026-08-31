"use client";

import { useEffect, useState } from "react";
import { faceOffRounds } from "@/data/games";
import { addPoints, readJson, storageKeys, writeJson } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function FaceOff() {
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const round = faceOffRounds[index];
  const done = index >= faceOffRounds.length;

  useEffect(() => {
    const saved = readJson(storageKeys.faceOff, { index: 0, picks: {} });
    setIndex(saved.index);
    setPicks(saved.picks);
  }, []);

  function choose(side: string) {
    if (!round) return;
    const next = { ...picks, [round.id]: side };
    setPicks(next);
    const nextIndex = index + 1;
    setIndex(nextIndex);
    writeJson(storageKeys.faceOff, { index: nextIndex, picks: next });
    if (nextIndex >= faceOffRounds.length) addPoints("You", 15, "Face-Off");
  }

  if (done) {
    return (
      <Card className="p-8 text-center">
        <h2 className="font-display text-4xl text-burgundy">Team locked in</h2>
        <p className="mt-3 text-ink-muted">
          Austin: {Object.values(picks).filter((v) => v === "Austin").length} • Alexa:{" "}
          {Object.values(picks).filter((v) => v === "Alexa").length}
        </p>
        <Button className="mt-6" type="button" onClick={() => { setIndex(0); setPicks({}); writeJson(storageKeys.faceOff, { index: 0, picks: {} }); }}>
          Play again
        </Button>
      </Card>
    );
  }

  return (
    <Card hover={false} className="p-8 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-gold-ink">
        Round {index + 1} / {faceOffRounds.length}
      </p>
      <h2 className="mt-4 font-display text-3xl text-burgundy">{round.prompt}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Button type="button" onClick={() => choose(round.a)}>{round.a}</Button>
        <Button type="button" variant="outline" onClick={() => choose(round.b)}>{round.b}</Button>
      </div>
    </Card>
  );
}
