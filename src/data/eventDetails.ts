import { weddingGuide } from "@/data/weddingGuide";

export type EventDetail = {
  duration: string;
  whatHappens: string;
  whyItMatters: string;
  whatGuestsDo: string;
};

const extras: Record<string, EventDetail> = {
  cocktail: {
    duration: "About 60 minutes",
    whatHappens:
      "Passed bites, first reunions, and the photo booth warming up. Guests arrive, find a drink, and settle into the day.",
    whyItMatters:
      "This is the soft opening of the wedding — the hour when strangers become a room full of people who love the same two humans.",
    whatGuestsDo:
      "Say hello to people you have not seen in years, grab something to eat, and enjoy the lawn. The ceremony comes next.",
  },
  dinner: {
    duration: "About 60 minutes",
    whatHappens:
      "Guests are invited to their tables and enjoy a beautiful, celebratory meal prepared just for today. Toasts and special moments may be shared throughout the dinner.",
    whyItMatters:
      "Dinner is a time to connect, celebrate, and recharge together. It brings everyone back before we get back on the dance floor for the rest of the night.",
    whatGuestsDo:
      "Find your table, settle in, and enjoy. Take a moment to chat with loved ones around you and get ready — more dancing is coming soon.",
  },
  "late-night": {
    duration: "Until the lights come up",
    whatHappens:
      "A second wind on the dance floor — slower songs, favorite hits, and the people who never want to leave.",
    whyItMatters:
      "The ceremony made us married. This last hour is for the guests who are still here, which is to say: our people.",
    whatGuestsDo: "If you are still here, stay. Comfortable shoes, one more song, and no early goodbyes.",
  },
};

export function getEventDetail(id: string): EventDetail | null {
  if (extras[id]) return extras[id];
  const stage = weddingGuide.find((item) => item.id === id);
  if (!stage) return null;
  return {
    duration: stage.duration,
    whatHappens: stage.whatHappens,
    whyItMatters: stage.whyItMatters,
    whatGuestsDo: stage.whatGuestsDo,
  };
}
