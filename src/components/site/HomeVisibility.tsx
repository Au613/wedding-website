"use client";

import Link from "next/link";
import { BookOpen, CalendarDays, Gamepad2, Heart, MapPin, Users } from "lucide-react";
import { quickLinks } from "@/data/couple";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/components/admin/AdminProvider";

const icons = [Heart, BookOpen, MapPin, CalendarDays, Gamepad2, Users];

export function HomeHeroActions() {
  const { isVisible } = useAdmin();
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {isVisible("/guide") ? (
        <Link href="/guide" className={cn(buttonVariants({ size: "lg" }))}>
          View wedding guide
        </Link>
      ) : null}
      {isVisible("/live") ? (
        <Link href="/live" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
          Live wedding mode
        </Link>
      ) : null}
    </div>
  );
}

export function HomeQuickLinks() {
  const { isVisible } = useAdmin();
  const links = quickLinks.filter((link) => isVisible(link.href));
  if (links.length === 0) return null;

  return (
    <div className="-mt-10 grid gap-3 rounded-card border border-gold/20 bg-cream-soft p-4 shadow-card sm:grid-cols-2 lg:grid-cols-6">
      {links.map((link) => {
        const Icon = icons[quickLinks.indexOf(link)] ?? Heart;
        return (
          <Link key={link.href} href={link.href} className="rounded-2xl px-3 py-4 text-center transition hover:-translate-y-1">
            <Icon className="mx-auto mb-2 h-5 w-5 text-gold-ink" />
            <span className="block text-xs uppercase tracking-[0.16em] text-burgundy">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function HomeDressTeaser() {
  const { isVisible } = useAdmin();
  if (!isVisible("/dress-code")) return null;
  return (
    <Link href="/dress-code" className={cn(buttonVariants({ variant: "outline" }), "mt-6 inline-flex")}>
      Read the dress code
    </Link>
  );
}
