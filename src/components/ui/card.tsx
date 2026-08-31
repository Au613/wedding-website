import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  hover = true,
  ...props
}: HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-card border border-gold/20 bg-cream-soft/80 shadow-card backdrop-blur-[2px]",
        hover &&
          "transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
      {...props}
    />
  );
}
