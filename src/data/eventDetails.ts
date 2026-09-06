import { weddingGuide } from "@/data/weddingGuide";

export type EventDetail = {
  duration: string;
  whatHappens: string;
  whyItMatters: string;
  whatGuestsDo: string;
};

const extras: Record<string, EventDetail> = {
  arrive: {
    duration: "12:00 PM",
    whatHappens: "The event starts and guests arrive at Felton Farm / Smith Barn.",
    whyItMatters: "This is the opening of the day — walk in, you belong here.",
    whatGuestsDo: "Arrive, say hello, and find Kabbalat Panim or the tisch.",
  },
  "tisch-speaking": {
    duration: "30 minutes",
    whatHappens: "Words of Torah and speaking at the tisch, while the meal continues.",
    whyItMatters: "It is the last gathering around Austin before he is danced to Alexa.",
    whatGuestsDo: "Listen, sing if you know the songs, and keep the energy high.",
  },
  processional: {
    duration: "30 minutes",
    whatHappens: "Guests and wedding party move from the tisch and kabbalat panim toward the chuppah.",
    whyItMatters: "This is the breath between greeting and covenant.",
    whatGuestsDo: "Follow ushers, find a seat, and settle in. Ceremony starts at 1:45.",
  },
  cocktail: {
    duration: "45 minutes",
    whatHappens:
      "Hors d'oeuvres and the first course while the couple and wedding party are in photos.",
    whyItMatters: "This is the first sit-down of the celebration — eat, reconnect, and get ready to dance.",
    whatGuestsDo: "Find a plate and a table. Dancing Round 1 starts at 3:30.",
  },
  dinner: {
    duration: "35 minutes",
    whatHappens: "The entree is served. Catch your breath between dance sets.",
    whyItMatters: "Dinner brings everyone back to the table before the next round of dancing.",
    whatGuestsDo: "Sit, eat, and enjoy the people around you. More dancing and dessert are next.",
  },
  "late-night": {
    duration: "40 minutes",
    whatHappens: "Dancing Round 2, plus dessert.",
    whyItMatters: "The second wind — the people who are still here, which is to say: our people.",
    whatGuestsDo: "Dance, grab dessert, and stay through benching if you can.",
  },
  "sheva-brachot": {
    duration: "20 minutes",
    whatHappens:
      "Benching — grace after meals — and then the seven blessings of joy, recited by people we love.",
    whyItMatters:
      "They widen the moment from two people to creation, community, and the joy of Zion itself.",
    whatGuestsDo:
      "Listen. If you know the responses, join softly. Details live on our Seven Brachot page.",
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
