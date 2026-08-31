import { cn } from "@/lib/utils";

export function Botanical({ className, tone = "gold" }: { className?: string; tone?: "gold" | "cream" }) {
  const color = tone === "gold" ? "#C4A36A" : "#F4EEE4";
  return (
    <svg
      viewBox="0 0 120 160"
      className={cn("pointer-events-none", className)}
      aria-hidden
      fill="none"
    >
      <path
        d="M60 150c0-28 18-38 18-62S61 58 60 18c-1 40-18 46-18 70s18 34 18 62Z"
        stroke={color}
        strokeWidth="1.2"
      />
      <path d="M60 78c16-8 28-6 38 4" stroke={color} strokeWidth="1" />
      <path d="M60 96c-16-8-28-6-38 4" stroke={color} strokeWidth="1" />
      <path d="M61 52c12-14 22-14 34-8" stroke={color} strokeWidth="1" />
      <path d="M59 52c-12-14-22-14-34-8" stroke={color} strokeWidth="1" />
      <circle cx="60" cy="18" r="2.2" fill={color} />
    </svg>
  );
}
