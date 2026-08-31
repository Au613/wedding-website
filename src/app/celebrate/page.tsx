"use client";

import { FormEvent, useEffect, useState } from "react";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { readJson, storageKeys, writeJson } from "@/lib/storage";

const occasions = ["Birthday", "Anniversary", "Engagement", "Other"] as const;

type Celebration = {
  name: string;
  occasion: string;
  years: string;
  note: string;
};

export default function CelebratePage() {
  const [occasion, setOccasion] = useState<string>("");
  const [name, setName] = useState("");
  const [years, setYears] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState<Celebration | null>(null);

  useEffect(() => {
    setSaved(readJson<Celebration | null>(storageKeys.celebrations, null));
  }, []);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = { name, occasion, years, note };
    writeJson(storageKeys.celebrations, next);
    setSaved(next);
  }

  return (
    <PageContainer>
      <SectionTitle title="Celebrating something too?" subtitle="Tell us, and we may have the MC say your names with extra sparkle." />
      <div className="mb-6 flex flex-wrap gap-3">
        {occasions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setOccasion(item)}
            className={`rounded-full px-5 py-3 text-xs uppercase tracking-[0.16em] ${
              occasion === item ? "bg-burgundy text-cream-soft" : "bg-cream-deep text-burgundy"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      {occasion ? (
        <Card hover={false} className="p-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input placeholder="Name(s)" value={name} onChange={(event) => setName(event.target.value)} required />
            <Input placeholder="Number of years (optional)" value={years} onChange={(event) => setYears(event.target.value)} />
            <textarea
              className="min-h-28 w-full rounded-3xl border border-gold/25 bg-cream-soft px-4 py-3"
              placeholder="A short note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            <Button type="submit">Share the joy</Button>
          </form>
        </Card>
      ) : null}
      {saved ? (
        <Card className="mt-8 p-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-ink">{saved.occasion}</p>
          <h2 className="mt-2 font-display text-4xl text-burgundy">Mazel tov, {saved.name}!</h2>
          {saved.years ? <p className="mt-2 text-ink-muted">{saved.years} beautiful years</p> : null}
          {saved.note ? <p className="mt-3 italic text-ink-muted">{saved.note}</p> : null}
        </Card>
      ) : null}
    </PageContainer>
  );
}
