import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GameCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Card className="flex h-full flex-col items-center p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold-ink">{icon}</div>
      <h3 className="font-display text-3xl text-burgundy">{title}</h3>
      <p className="mt-2 flex-1 text-ink-muted">{description}</p>
      <Link href={href} className={cn(buttonVariants(), "mt-6")}>
        Play now
      </Link>
    </Card>
  );
}
