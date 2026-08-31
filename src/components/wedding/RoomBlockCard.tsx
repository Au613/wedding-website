import Link from "next/link";
import { venue } from "@/data/venue";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RoomBlockCard() {
  return (
    <Card className="p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-ink">Where to stay</p>
      <h3 className="mt-2 font-display text-3xl text-burgundy">Nearby hotels</h3>
      <p className="mt-3 max-w-xl text-ink-muted">
        There is no room block. These are two nearby suggestions if you would like to stay close to the farm.
      </p>
      <ul className="mt-6 space-y-5">
        {venue.hotels.map((hotel) => (
          <li key={hotel.name} className="rounded-2xl border border-gold/20 bg-cream-soft p-4">
            <h4 className="font-display text-2xl text-burgundy">{hotel.name}</h4>
            <p className="mt-1 text-sm text-ink-muted">{hotel.address}</p>
            <Link
              href={hotel.mapsUrl}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-3 inline-flex")}
            >
              Get directions
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
