import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageContainer({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={cn("mx-auto w-full px-4 pb-24 pt-10 md:px-8 md:pb-16", wide ? "max-w-site" : "max-w-6xl", className)}>
      {children}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow ? (
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold-ink">{eyebrow}</p>
      ) : null}
      <h1 className="font-display text-4xl text-burgundy md:text-6xl">{title}</h1>
      {subtitle ? <p className="mt-4 text-ink-muted">{subtitle}</p> : null}
      <div className="gold-rule mx-auto mt-6 w-40" />
    </div>
  );
}
