import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "burgundy",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "burgundy" | "gold" | "blue" | "green" | "pink" | "purple";
}) {
  const tones = {
    burgundy: "bg-burgundy-mist text-burgundy",
    gold: "bg-gold-pale/60 text-gold-ink",
    blue: "bg-sky-100 text-sky-800",
    green: "bg-emerald-50 text-emerald-800",
    pink: "bg-rose-50 text-rose-800",
    purple: "bg-violet-100 text-violet-800",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
