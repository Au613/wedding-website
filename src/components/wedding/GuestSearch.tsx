"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { guests, guestFilters, guestName, type Guest } from "@/data/guests";
import { Input } from "@/components/ui/input";
import { GuestCard } from "./GuestCard";
import { GuestProfile } from "./GuestProfile";
import { cn } from "@/lib/utils";

function matches(guest: Guest, query: string, filter: string) {
  const hay = [
    guestName(guest),
    guest.relation,
    guest.hometown,
    guest.college ?? "",
    guest.workplace ?? "",
    `table ${guest.table}`,
    guest.side,
    guest.group,
  ]
    .join(" ")
    .toLowerCase();
  if (query && !hay.includes(query.toLowerCase())) return false;
  if (filter === "all") return true;
  if (filter === "bride") return guest.side === "bride" || guest.side === "both";
  if (filter === "groom") return guest.side === "groom" || guest.side === "both";
  return guest.group === filter || (filter === "friends" && guest.group === "wedding-party");
}

export function GuestSearch() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(guests[0]?.id ?? "");
  const filtered = useMemo(() => guests.filter((guest) => matches(guest, query, filter)), [query, filter]);
  const selected = guests.find((guest) => guest.id === selectedId) ?? filtered[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search guests</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, table, college, hometown..."
              className="pl-11"
            />
          </label>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {guestFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em]",
                filter === item.id ? "bg-burgundy text-cream-soft" : "bg-cream-deep text-ink-muted",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="grid gap-3">
          {filtered.map((guest) => (
            <GuestCard
              key={guest.id}
              guest={guest}
              active={guest.id === selected?.id}
              onSelect={() => setSelectedId(guest.id)}
            />
          ))}
          {filtered.length === 0 ? (
            <p className="rounded-card border border-gold/20 p-8 text-center text-ink-muted">No guests match that search.</p>
          ) : null}
        </div>
      </div>
      {selected ? <GuestProfile guest={selected} /> : null}
    </div>
  );
}
