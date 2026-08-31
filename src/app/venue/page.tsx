import Link from "next/link";
import { Radio } from "lucide-react";
import { venue } from "@/data/venue";
import { VenueMap } from "@/components/wedding/VenueMap";
import { VisibleLink } from "@/components/site/VisibleLink";
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
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <Link href={venue.directionsUrl} className={cn(buttonVariants({ size: "sm" }), "inline-flex")}>
            Get directions
          </Link>
          <VisibleLink href="/live" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "inline-flex")}>
            <Radio className="h-3.5 w-3.5" />
            Back to live mode
          </VisibleLink>
        </div>
      </div>
      <VenueMap />
    </div>
  );
}
