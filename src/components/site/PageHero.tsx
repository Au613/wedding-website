import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function PageHero({
  image,
  alt,
  children,
  compact = false,
}: {
  image: string;
  alt: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-burgundy-dark",
        compact ? "min-h-[48vh]" : "min-h-[88vh]",
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority
        className="object-contain object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/85 via-burgundy-dark/20 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-site flex-col items-center justify-end px-4 pb-16 pt-28 text-center text-cream-soft md:pb-20">
        {children}
      </div>
    </section>
  );
}
