"use client";

import { groupLabel, guestName, sideLabel, type Guest } from "@/data/guests";
import { Badge } from "@/components/ui/badge";
import { initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const tones = {
  family: "blue",
  friends: "pink",
  college: "purple",
  work: "gold",
  "wedding-party": "purple",
  other: "green",
} as const;

export function GuestCard({
  guest,
  active,
  onSelect,
}: {
  guest: Guest;
  active?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-4 rounded-card border bg-cream-soft p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-lift",
        active ? "border-burgundy/40" : "border-gold/20",
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-burgundy text-sm text-cream-soft">
        {initials(guestName(guest))}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{guestName(guest)}</span>
        <span className="block truncate text-sm text-ink-muted">{guest.relation} • Table {guest.table}</span>
      </span>
      <Badge tone={tones[guest.group]}>{groupLabel(guest.group)}</Badge>
      <span className="sr-only">{sideLabel(guest.side)}</span>
    </button>
  );
}
