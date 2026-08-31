"use client";

import Link from "next/link";
import { couple } from "@/data/couple";
import { venue } from "@/data/venue";
import { Card } from "@/components/ui/card";
import { useAdmin } from "@/components/admin/AdminProvider";

const extras = [
  { href: "/venue", title: "Venue & Directions", body: venue.address },
  { href: "/venue", title: "Parking", body: venue.parking },
  { href: "/travel", title: "Shuttle", body: venue.shuttle },
  { href: couple.registryUrl, title: "Registry", body: "A list, if you like lists.", external: true },
  { href: "/faq", title: "FAQ", body: "Airports, kids, kashrut, and cameras." },
];

export function TravelExtras() {
  const { isVisible } = useAdmin();
  return (
    <>
      {extras
        .filter((item) => item.external || isVisible(item.href))
        .map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="p-5">
              <h3 className="font-display text-2xl text-burgundy">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{item.body}</p>
            </Card>
          </Link>
        ))}
    </>
  );
}
