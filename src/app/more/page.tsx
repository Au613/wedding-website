"use client";

import Link from "next/link";
import { BookHeart, Camera, Map, Menu, Radio, Shirt, Sparkles, Wine } from "lucide-react";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { Card } from "@/components/ui/card";
import { useAdmin } from "@/components/admin/AdminProvider";

const links = [
  { href: "/live", title: "Live Wedding Mode", icon: Radio },
  { href: "/dress-code", title: "Dress Code", icon: Shirt },
  { href: "/venue", title: "Venue Map", icon: Map },
  { href: "/brachot", title: "Seven Brachot", icon: Wine },
  { href: "/guestbook", title: "Guest Book", icon: BookHeart },
  { href: "/photos", title: "Share Photos", icon: Camera },
  { href: "/menu", title: "Menu & Voting", icon: Menu },
  { href: "/celebrate", title: "Celebrating Too?", icon: Sparkles },
];

export default function MorePage() {
  const { isVisible } = useAdmin();
  const visible = links.filter((link) => isVisible(link.href));

  return (
    <PageContainer>
      <SectionTitle title="More of the weekend" subtitle="The quieter rooms, the live companion, and the playful extras." />
      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <Card className="flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-2xl text-burgundy">{link.title}</span>
              </Card>
            </Link>
          );
        })}
      </div>
    </PageContainer>
  );
}
