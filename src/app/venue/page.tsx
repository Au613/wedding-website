import Link from "next/link";
import { venue } from "@/data/venue";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { VenueMap } from "@/components/wedding/VenueMap";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = { title: "Venue Map" };

export default function VenuePage() {
  return (
    <PageContainer wide>
      <SectionTitle title="Venue Map" subtitle="Find the lawn, the ballroom, and the photo booth before the night gets glittering." />
      <div className="mb-6">
        <Link href={venue.directionsUrl} className={cn(buttonVariants())}>
          Get directions
        </Link>
      </div>
      <VenueMap />
    </PageContainer>
  );
}
