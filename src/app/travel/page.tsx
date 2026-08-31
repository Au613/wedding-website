import Image from "next/image";
import { couple } from "@/data/couple";
import { venue } from "@/data/venue";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { RoomBlockCard } from "@/components/wedding/RoomBlockCard";
import { TravelExtras } from "@/components/wedding/TravelExtras";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Travel" };

export default function TravelPage() {
  return (
    <PageContainer wide>
      <SectionTitle title="Travel & Stay" subtitle="How to arrive, where to sleep, and how not to miss the chuppah." />
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <RoomBlockCard />
          <Card className="mt-6 overflow-hidden p-0">
            <div className="relative h-64 bg-cream-deep">
              <Image src={couple.photos.hotel} alt="Austin and Alexa walking through a field" fill className="object-contain object-center" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl text-burgundy">Address</h3>
              <p className="text-ink-muted">{venue.address}</p>
              <p className="mt-4 text-sm text-ink-muted">{venue.rideshare}</p>
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-display text-2xl text-burgundy">Airports</h3>
            <ul className="mt-3 space-y-3 text-sm text-ink-muted">
              {venue.airports.map((airport) => (
                <li key={airport.code}>
                  <strong className="text-ink">{airport.code}</strong> · {airport.name} — {airport.note}
                </li>
              ))}
            </ul>
          </Card>
          <TravelExtras />
        </div>
      </div>
    </PageContainer>
  );
}
