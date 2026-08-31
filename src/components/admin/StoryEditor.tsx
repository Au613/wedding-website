"use client";

import { useEffect, useRef, useState, type DragEvent } from "react";
import { GripVertical, Plus, Trash2, X } from "lucide-react";
import type { StoryMilestone } from "@/data/story";
import { cn } from "@/lib/utils";
import { useAdmin } from "./AdminProvider";

function blankMilestone(): StoryMilestone {
  return {
    id: `story-${Date.now()}`,
    date: "",
    title: "",
    caption: "",
    photo: "/photos/walking.jpg",
  };
}

export function StoryEditor() {
  const { storyOpen, setStoryOpen, setOpen, needsPin, unlockAdmin, milestones, saveStory } = useAdmin();
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [draft, setDraft] = useState<StoryMilestone[]>(milestones);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropHint, setDropHint] = useState<{ index: number; edge: "before" | "after" } | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dragIndex = useRef<number | null>(null);

  useEffect(() => {
    if (storyOpen) {
      setDraft(milestones);
      setSaved(false);
      setDraggingId(null);
      setDropHint(null);
    }
  }, [storyOpen, milestones]);

  if (!storyOpen) return null;

  function update(index: number, patch: Partial<StoryMilestone>) {
    setDraft((items) => items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    setSaved(false);
  }

  function reorder(from: number, to: number) {
    if (from === to || from < 0 || to < 0) return;
    setDraft((items) => {
      if (from >= items.length) return items;
      const copy = [...items];
      const [removed] = copy.splice(from, 1);
      copy.splice(Math.min(to, copy.length), 0, removed);
      return copy;
    });
    setSaved(false);
  }

  function autoScroll(clientY: number) {
    const list = listRef.current;
    if (!list) return;
    const rect = list.getBoundingClientRect();
    const zone = 56;
    if (clientY < rect.top + zone) list.scrollTop -= 18;
    else if (clientY > rect.bottom - zone) list.scrollTop += 18;
  }

  function onHandleDragStart(event: DragEvent<HTMLDivElement>, index: number, id: string) {
    dragIndex.current = index;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
    event.dataTransfer.setData("application/x-story-index", String(index));
    setDraggingId(id);
  }

  function onCardDragOver(event: DragEvent<HTMLElement>, index: number) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    autoScroll(event.clientY);
    const rect = event.currentTarget.getBoundingClientRect();
    const edge = event.clientY < rect.top + rect.height / 2 ? "before" : "after";
    setDropHint({ index, edge });
  }

  function onCardDrop(event: DragEvent<HTMLElement>, index: number) {
    event.preventDefault();
    const from = dragIndex.current;
    if (from == null) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const edge = event.clientY < rect.top + rect.height / 2 ? "before" : "after";
    let to = edge === "after" ? index + 1 : index;
    if (from < to) to -= 1;
    reorder(from, to);
    dragIndex.current = null;
    setDraggingId(null);
    setDropHint(null);
  }

  function onDragEnd() {
    dragIndex.current = null;
    setDraggingId(null);
    setDropHint(null);
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-burgundy-dark/55 p-4 backdrop-blur-sm"
      onClick={() => setStoryOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-editor-title"
        className="relative flex max-h-[min(88dvh,52rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-gold/30 bg-cream shadow-lift"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between bg-burgundy px-6 py-5 text-cream-soft">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-pale">Our Story</p>
            <h2 id="story-editor-title" className="font-display text-3xl">
              Edit timeline
            </h2>
            <p className="mt-1 text-sm text-cream-soft/75">
              Ctrl + Shift + 7 · drag the left edge to reorder
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStoryOpen(false)}
            className="rounded-full border border-gold/30 p-2"
            aria-label="Close story editor"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {needsPin ? (
          <form
            className="overflow-y-auto p-8"
            onSubmit={async (event) => {
              event.preventDefault();
              const ok = await unlockAdmin(pin);
              setPinError(!ok);
              if (ok) setPin("");
            }}
          >
            <p className="text-sm text-ink-muted">Enter the admin PIN from ADMIN_SECRET to edit the story timeline.</p>
            <input
              type="password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              className="mt-4 w-full rounded-full border border-gold/30 bg-cream-soft px-4 py-3"
              autoFocus
            />
            {pinError ? <p className="mt-2 text-sm text-burgundy">That PIN did not match.</p> : null}
            <button type="submit" className="mt-4 rounded-full bg-burgundy px-6 py-2 text-sm uppercase tracking-[0.16em] text-cream-soft">
              Unlock
            </button>
          </form>
        ) : (
          <>
            <div
              ref={listRef}
              className="story-editor-scroll min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 md:px-8"
              onDragOver={(event) => {
                event.preventDefault();
                autoScroll(event.clientY);
              }}
            >
              {draft.map((item, index) => {
                const hintHere = dropHint?.index === index;
                return (
                  <article
                    key={item.id}
                    onDragOver={(event) => onCardDragOver(event, index)}
                    onDrop={(event) => onCardDrop(event, index)}
                    className={cn(
                      "flex overflow-hidden rounded-2xl border bg-cream-soft transition",
                      draggingId === item.id ? "border-gold/50 opacity-45" : "border-gold/20",
                      hintHere && dropHint?.edge === "before" && "border-t-4 border-t-burgundy",
                      hintHere && dropHint?.edge === "after" && "border-b-4 border-b-burgundy",
                    )}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Drag to reorder milestone ${index + 1}`}
                      onDragStart={(event) => onHandleDragStart(event, index, item.id)}
                      onDragEnd={onDragEnd}
                      className="flex w-10 shrink-0 cursor-grab touch-none items-center justify-center border-r border-gold/20 bg-cream-deep text-gold-ink active:cursor-grabbing"
                    >
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 p-4">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gold-ink">Milestone {index + 1}</p>
                        <button
                          type="button"
                          className="rounded-full border border-gold/25 p-1.5 text-burgundy"
                          onClick={() => {
                            setDraft((items) => items.filter((_, i) => i !== index));
                            setSaved(false);
                          }}
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-ink-muted">Date</label>
                      <input
                        value={item.date}
                        onChange={(event) => update(index, { date: event.target.value })}
                        className="mt-1 w-full rounded-xl border border-gold/25 bg-cream px-3 py-2 text-sm"
                      />
                      <label className="mt-3 block text-xs uppercase tracking-[0.14em] text-ink-muted">Title</label>
                      <input
                        value={item.title}
                        onChange={(event) => update(index, { title: event.target.value })}
                        className="mt-1 w-full rounded-xl border border-gold/25 bg-cream px-3 py-2 text-sm"
                      />
                      <label className="mt-3 block text-xs uppercase tracking-[0.14em] text-ink-muted">Caption</label>
                      <textarea
                        value={item.caption}
                        onChange={(event) => update(index, { caption: event.target.value })}
                        rows={3}
                        className="mt-1 w-full rounded-xl border border-gold/25 bg-cream px-3 py-2 text-sm"
                      />
                      <label className="mt-3 block text-xs uppercase tracking-[0.14em] text-ink-muted">Photo path</label>
                      <input
                        value={item.photo}
                        onChange={(event) => update(index, { photo: event.target.value })}
                        className="mt-1 w-full rounded-xl border border-gold/25 bg-cream px-3 py-2 text-sm"
                      />
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3 border-t border-gold/20 bg-cream px-4 py-4 md:px-8">
              <button
                type="button"
                onClick={() => {
                  setDraft((items) => [...items, blankMilestone()]);
                  setSaved(false);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-sm"
              >
                <Plus className="h-4 w-4" />
                Add milestone
              </button>
              <button
                type="button"
                onClick={() => {
                  setStoryOpen(false);
                  setOpen(true);
                }}
                className="rounded-full border border-gold/30 px-4 py-2 text-sm"
              >
                Day-of controls
              </button>
              <button
                type="button"
                disabled={saving || draft.length === 0}
                onClick={async () => {
                  setSaving(true);
                  const ok = await saveStory(draft);
                  setSaving(false);
                  setSaved(ok);
                }}
                className="rounded-full bg-burgundy px-6 py-2 text-sm uppercase tracking-[0.16em] text-cream-soft disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save timeline"}
              </button>
              {saved ? <p className="text-sm text-gold-ink">Saved. Guests will see the new story.</p> : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
