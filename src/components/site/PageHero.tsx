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
      <div
        className={cn(
          "mx-auto grid max-w-site min-h-[inherit] lg:grid-cols-2",
          compact ? "min-h-[48vh]" : "min-h-[88vh]",
        )}
      >
        <div
          className={cn(
            "relative w-full bg-burgundy-dark",
            compact ? "min-h-[28vh]" : "min-h-[42vh] lg:min-h-full",
          )}
        >
          <Image
            src={image}
            alt={alt}
            fill
            priority
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 text-center text-cream-soft sm:px-10 lg:items-start lg:px-12 lg:py-20 lg:text-left xl:px-16">
          {children}
        </div>
      </div>
    </section>
  );
}
