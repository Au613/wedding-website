import { cn } from "@/lib/utils";

export function Monogram({
  className,
  size = "md",
  light = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  light?: boolean;
}) {
  const sizes = { sm: "h-10 w-10 text-sm", md: "h-12 w-12 text-base", lg: "h-16 w-16 text-xl" };
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-full border font-display",
        light ? "border-gold/50 text-gold-pale" : "border-gold/70 text-burgundy",
        sizes[size],
        className,
      )}
      aria-hidden
    >
      A&A
      <span className="absolute -bottom-1 right-0 h-3 w-3 rotate-12 text-[8px] text-gold">✦</span>
    </span>
  );
}
