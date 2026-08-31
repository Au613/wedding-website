"use client";

import { FormEvent, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { readJson, storageKeys, writeJson } from "@/lib/storage";

type SavedPhoto = { id: string; src: string; caption: string; name: string; monkey: boolean };

export function PhotoUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [name, setName] = useState("");
  const [monkey, setMonkey] = useState(true);
  const [saved, setSaved] = useState<SavedPhoto[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  function onFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(file);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!preview) return;
    const next = [
      { id: crypto.randomUUID(), src: preview, caption, name: name || "Guest", monkey },
      ...readJson<SavedPhoto[]>(storageKeys.photos, []),
    ];
    writeJson(storageKeys.photos, next);
    setSaved(next);
    setCaption("");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card hover={false} className="p-6">
        <h2 className="font-display text-3xl text-burgundy">Share your photos</h2>
        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="block w-full text-sm"
            onChange={(event) => onFile(event.target.files?.[0])}
          />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={monkey} onChange={(event) => setMonkey(event.target.checked)} />
            Automatically add the wedding monkey
          </label>
          <Input placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} />
          <Input placeholder="Caption" value={caption} onChange={(event) => setCaption(event.target.value)} />
          <Button type="submit" disabled={!preview}>
            Submit
          </Button>
          <p className="text-xs text-ink-faint">
            The monkey is a client-side sticker overlay for now. An image-edit endpoint can replace this later.
          </p>
        </form>
      </Card>
      <Card hover={false} className="relative min-h-80 overflow-hidden p-0">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Upload preview" className="h-full w-full object-contain object-center" />
        ) : (
          <div className="flex h-full min-h-80 items-center justify-center text-ink-muted">Preview appears here</div>
        )}
        {preview && monkey ? (
          <div className="absolute bottom-6 right-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#6b4226] text-4xl shadow-lift" aria-hidden>
            🐵
          </div>
        ) : null}
      </Card>
      {saved.length ? (
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-3">
          {saved.map((photo) => (
            <Card key={photo.id} className="overflow-hidden p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.caption || "Guest photo"} className="h-40 w-full object-contain object-center bg-cream-deep" />
              <div className="p-3 text-sm">
                <p className="font-medium">{photo.name}</p>
                <p className="text-ink-muted">{photo.caption}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
