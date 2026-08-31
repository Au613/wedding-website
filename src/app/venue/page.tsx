import Link from "next/link";
import { venue } from "@/data/venue";
import { VenueMap } from "@/components/wedding/VenueMap";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = { title: "Venue Map" };

export default function VenuePage() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-site flex-1 flex-col overflow-hidden px-4 pb-[4.75rem] pt-3 md:px-8 md:pb-4">
      <div className="mb-3 shrink-0 text-center md:mb-4">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-ink">Venue Map</p>
        <h1 className="mt-1 font-display text-3xl leading-tight text-burgundy md:text-4xl">{venue.name}</h1>
        <p className="mt-1 text-sm text-ink-muted">{venue.address}</p>
        <Link href={venue.directionsUrl} className={cn(buttonVariants({ size: "sm" }), "mt-2 inline-flex")}>
          Get directions
        </Link>
      </div>
      <VenueMap />
    </div>
  );
}
