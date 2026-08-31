"use client";

import { FormEvent, useEffect, useState } from "react";
import { readJson, storageKeys, writeJson } from "@/lib/storage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Entry = {
  id: string;
  name: string;
  category: string;
  message: string;
  anonymous: boolean;
};

const seed: Entry[] = [
  {
    id: "1",
    name: "Maya",
    category: "Mazel Tov",
    message: "Mazel tov to the most elegant pair we know. Save us a hora.",
    anonymous: false,
  },
  {
    id: "2",
    name: "A college friend",
    category: "Memory",
    message: "Still thinking about that first Shabbat when you two could not stop talking.",
    anonymous: true,
  },
];

export function GuestBookForm() {
  const [entries, setEntries] = useState<Entry[]>(seed);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("Mazel Tov");
  const [anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    setEntries(readJson(storageKeys.guestbook, seed));
  }, []);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) return;
    const next = [
      {
        id: crypto.randomUUID(),
        name: anonymous || !name.trim() ? "A guest" : name.trim(),
        category,
        message: message.trim(),
        anonymous,
      },
      ...entries,
    ];
    setEntries(next);
    writeJson(storageKeys.guestbook, next);
    setMessage("");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <Card hover={false} className="p-6">
        <h2 className="font-display text-3xl text-burgundy">Leave a note</h2>
        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm">
            Category
            <select
              className="mt-1 w-full rounded-full border border-gold/25 bg-cream-soft px-4 py-3"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {["Advice", "Memory", "Mazel Tov", "Funny Story"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Your name
            <Input className="mt-1" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} />
            Post anonymously
          </label>
          <label className="block text-sm">
            Message
            <textarea
              className="mt-1 min-h-32 w-full rounded-3xl border border-gold/25 bg-cream-soft px-4 py-3"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </label>
          <Button type="submit">Add your note</Button>
        </form>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        {entries.map((entry) => (
          <Card key={entry.id} className="rotate-[-0.6deg] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-gold-ink">{entry.category}</p>
            <p className="mt-3 font-display text-xl leading-relaxed">{entry.message}</p>
            <p className="mt-4 text-sm text-ink-muted">— {entry.anonymous ? "Anonymous" : entry.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
