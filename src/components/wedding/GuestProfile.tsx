import { guests, guestName, groupLabel, sideLabel, type Guest } from "@/data/guests";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { initials } from "@/lib/utils";

export function GuestProfile({ guest }: { guest: Guest }) {
  const recs = (guest.youMightKnow ?? [])
    .map((id) => guests.find((item) => item.id === id))
    .filter(Boolean) as Guest[];

  return (
    <Card hover={false} className="h-fit p-6">
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-burgundy font-display text-xl text-cream-soft">
          {initials(guestName(guest))}
        </span>
        <div>
          <h2 className="font-display text-3xl text-burgundy">{guestName(guest)}</h2>
          <p className="text-sm text-ink-muted">{guest.relation}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>{sideLabel(guest.side)}</Badge>
        <Badge tone="gold">Table {guest.table}</Badge>
        <Badge tone="pink">{groupLabel(guest.group)}</Badge>
      </div>
      <p className="mt-5 leading-relaxed text-ink-muted">{guest.bio}</p>
      <dl className="mt-5 space-y-3 text-sm">
        <div>
          <dt className="uppercase tracking-[0.16em] text-gold-ink">How they know us</dt>
          <dd className="text-ink-muted">{guest.howTheyKnow}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.16em] text-gold-ink">Fun fact</dt>
          <dd className="text-ink-muted">{guest.funFact}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.16em] text-gold-ink">Hometown</dt>
          <dd className="text-ink-muted">{guest.hometown}</dd>
        </div>
      </dl>
      <Button className="mt-6 w-full" type="button">
        Say hi
      </Button>
      {recs.length ? (
        <div className="mt-8">
          <h3 className="mb-3 text-xs uppercase tracking-[0.18em] text-gold-ink">You might know</h3>
          <ul className="space-y-2">
            {recs.map((item) => (
              <li key={item.id} className="rounded-2xl bg-cream px-3 py-2 text-sm">
                {guestName(item)} • {item.relation}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}
