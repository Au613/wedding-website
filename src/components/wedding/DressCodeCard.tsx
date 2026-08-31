import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function DressCodeCard({
  title,
  points,
  children,
}: {
  title: string;
  points: string[];
  children?: ReactNode;
}) {
  return (
    <Card className="overflow-hidden">
      {children}
      <div className="p-6">
        <h3 className="font-display text-3xl text-burgundy">{title}</h3>
        <ul className="mt-4 space-y-2 text-ink-muted">
          {points.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="text-gold-ink">✦</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
