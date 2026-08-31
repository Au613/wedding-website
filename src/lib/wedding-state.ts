import type { LiveNowId } from "@/data/schedule";
import { defaultPageVisibility } from "@/data/sitePages";

export type WeddingSnapshot = {
  liveMode: boolean;
  currentStep: LiveNowId;
  pages: Record<string, boolean>;
  updatedAt: string;
  channel: string;
  connectedGuests?: number;
};

export function mergePages(rows: Array<{ slug: string; visible: boolean }>) {
  const pages = defaultPageVisibility();
  for (const row of rows) {
    pages[row.slug] = row.visible;
  }
  pages["/"] = true;
  return pages;
}
