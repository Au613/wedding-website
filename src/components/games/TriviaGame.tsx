"use client";

import { useEffect, useState } from "react";
import { triviaQuestions } from "@/data/games";
import { addPoints, readJson, storageKeys, writeJson } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function TriviaGame() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const question = triviaQuestions[index];
  const done = index >= triviaQuestions.length;

  useEffect(() => {
    const saved = readJson(storageKeys.trivia, { index: 0, score: 0 });
    setIndex(saved.index);
    setScore(saved.score);
  }, []);

  function choose(choice: number) {
    if (picked !== null || !question) return;
    setPicked(choice);
    const nextScore = choice === question.answerIndex ? score + 1 : score;
    setScore(nextScore);
    writeJson(storageKeys.trivia, { index, score: nextScore });
  }

  function next() {
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setPicked(null);
    writeJson(storageKeys.trivia, { index: nextIndex, score });
    if (nextIndex >= triviaQuestions.length) addPoints("You", score * 10, "Trivia");
  }

  if (done) {
    return (
      <Card className="p-8 text-center">
        <h2 className="font-display text-4xl text-burgundy">You know us {score}/{triviaQuestions.length}</h2>
        <p className="mt-3 text-ink-muted">Points added to the leaderboard. Refresh to keep bragging.</p>
        <Button className="mt-6" type="button" onClick={() => { setIndex(0); setScore(0); setPicked(null); writeJson(storageKeys.trivia, { index: 0, score: 0 }); }}>
          Play again
        </Button>
      </Card>
    );
  }

  return (
    <Card hover={false} className="p-6 md:p-10">
      <p className="text-xs uppercase tracking-[0.2em] text-gold-ink">
        {question.category} • {index + 1} / {triviaQuestions.length} • Score {score}
      </p>
      <h2 className="mt-4 font-display text-3xl text-burgundy md:text-4xl">{question.question}</h2>
      <div className="mt-8 grid gap-3">
        {question.choices.map((choice, choiceIndex) => {
          const correct = picked !== null && choiceIndex === question.answerIndex;
          const wrong = picked === choiceIndex && !correct;
          return (
            <button
              key={choice}
              type="button"
              onClick={() => choose(choiceIndex)}
              className={`rounded-2xl border px-4 py-3 text-left ${
                correct ? "border-emerald-600 bg-emerald-50" : wrong ? "border-burgundy bg-burgundy-mist" : "border-gold/25 bg-cream-soft"
              }`}
            >
              {choice}
            </button>
          );
        })}
      </div>
      {picked !== null ? (
        <div className="mt-6">
          <p className="text-ink-muted">{question.reveal}</p>
          <Button className="mt-4" type="button" onClick={next}>
            Next question
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
