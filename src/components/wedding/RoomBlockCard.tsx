import Link from "next/link";
import { venue } from "@/data/venue";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RoomBlockCard() {
  const hotel = venue.hotel;
  return (
    <Card className="p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-ink">Room block</p>
      <h3 className="mt-2 font-display text-3xl text-burgundy">{hotel.name}</h3>
      <p className="mt-3 max-w-xl text-ink-muted">{hotel.blurb}</p>
      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="uppercase tracking-[0.16em] text-gold-ink">Code</dt>
          <dd className="font-medium">{hotel.code}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.16em] text-gold-ink">Book by</dt>
          <dd>{hotel.deadline}</dd>
        </div>
      </dl>
      <ul className="mt-5 flex flex-wrap gap-2">
        {hotel.perks.map((perk) => (
          <li key={perk} className="rounded-full bg-burgundy-mist px-3 py-1 text-xs uppercase tracking-[0.12em] text-burgundy">
            {perk}
          </li>
        ))}
      </ul>
      <Link href={hotel.bookingUrl} className={cn(buttonVariants(), "mt-6 inline-flex")}>
        Book your room
      </Link>
    </Card>
  );
}
