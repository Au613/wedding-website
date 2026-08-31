export type EventStatus = "upcoming" | "happening" | "completed";

export type ScheduleEvent = {
  id: string;
  title: string;
  scheduledTime: string;
  timeLabel: string;
  location: string;
  description: string;
  guestTip: string;
  icon: "glass" | "heart" | "users" | "spark" | "music" | "utensils" | "moon" | "flower";
};

export const schedule: ScheduleEvent[] = [
  {
    id: "tisch",
    title: "Tisch",
    scheduledTime: "2026-06-22T17:30:00-04:00",
    timeLabel: "5:30 PM",
    location: "Groom's salon",
    description: "Austin gathers with family and friends for words of Torah, a l'chaim, and a little pre-ceremony joy.",
    guestTip: "If you're invited to the tisch, come ready to sing. Everyone else: Kabbalat Panim is the place to be.",
    icon: "glass",
  },
  {
    id: "kabbalat-panim",
    title: "Kabbalat Panim",
    scheduledTime: "2026-06-22T17:45:00-04:00",
    timeLabel: "5:45 PM",
    location: "Bride's receiving room",
    description: "Alexa receives guests like royalty. This is greeting, glamour, and the last calm before the veil.",
    guestTip: "Come say mazel tov, keep the receiving line moving, and save the long stories for later.",
    icon: "heart",
  },
  {
    id: "badeken",
    title: "Badeken",
    scheduledTime: "2026-06-22T18:00:00-04:00",
    timeLabel: "6:00 PM",
    location: "Bride's receiving room",
    description: "Austin veils Alexa — a moment that is intimate, ancient, and usually tearful.",
    guestTip: "Stand close enough to witness, quiet enough to let it be theirs.",
    icon: "flower",
  },
  {
    id: "chuppah",
    title: "Chuppah",
    scheduledTime: "2026-06-22T18:15:00-04:00",
    timeLabel: "6:15 PM",
    location: "Garden chuppah lawn",
    description: "The wedding canopy. Open on all sides, like the home we hope to build.",
    guestTip: "Follow ushers toward the lawn. Phones down during the ceremony if you can bear it.",
    icon: "spark",
  },
  {
    id: "kiddushin",
    title: "Kiddushin",
    scheduledTime: "2026-06-22T18:25:00-04:00",
    timeLabel: "6:25 PM",
    location: "Under the chuppah",
    description: "The betrothal: a ring, a blessing over wine, and the words that make this official.",
    guestTip: "You'll hear Hebrew, see a ring, and feel the air change. That's the moment.",
    icon: "heart",
  },
  {
    id: "sheva-brachot",
    title: "Sheva Brachot",
    scheduledTime: "2026-06-22T18:40:00-04:00",
    timeLabel: "6:40 PM",
    location: "Under the chuppah",
    description: "Seven blessings of joy, recited by people we love.",
    guestTip: "Listen for the themes: wine, creation, companionship, and a whole lot of joy.",
    icon: "spark",
  },
  {
    id: "breaking-glass",
    title: "Breaking the Glass",
    scheduledTime: "2026-06-22T18:55:00-04:00",
    timeLabel: "6:55 PM",
    location: "Under the chuppah",
    description: "A glass breaks, the room shouts mazel tov, and we are married.",
    guestTip: "When you hear the glass, that's your cue: Mazel tov!",
    icon: "glass",
  },
  {
    id: "yichud",
    title: "Yichud",
    scheduledTime: "2026-06-22T19:00:00-04:00",
    timeLabel: "7:00 PM",
    location: "Private yichud room",
    description: "A few quiet minutes alone as a married couple while cocktail hour begins.",
    guestTip: "Do not wait for us. Cocktail hour is open — eat, drink, find your table later.",
    icon: "heart",
  },
  {
    id: "cocktail",
    title: "Cocktail Hour",
    scheduledTime: "2026-06-22T19:15:00-04:00",
    timeLabel: "7:15 PM",
    location: "Terrace & lawn",
    description: "Passed bites, first reunions, and the photo booth warming up.",
    guestTip: "This is the best time to say hello to people you have not seen in years.",
    icon: "utensils",
  },
  {
    id: "reception",
    title: "Reception",
    scheduledTime: "2026-06-22T19:45:00-04:00",
    timeLabel: "7:45 PM",
    location: "Grand ballroom",
    description: "We enter, we dance, we sit, we feast.",
    guestTip: "Find your table card, then find the dance floor. Both matter.",
    icon: "users",
  },
  {
    id: "dinner",
    title: "Dinner",
    scheduledTime: "2026-06-22T20:15:00-04:00",
    timeLabel: "8:15 PM",
    location: "Grand ballroom",
    description: "A kosher dinner, toasts, and a little catching of breath.",
    guestTip: "If you have a toast, keep it kind, short, and destined for the microphone — not the table.",
    icon: "utensils",
  },
  {
    id: "dancing",
    title: "Dancing",
    scheduledTime: "2026-06-22T20:45:00-04:00",
    timeLabel: "8:45 PM",
    location: "Ballroom dance floor",
    description: "Hora, chair lifting, and the kind of dancing that does not require a plan.",
    guestTip: "Comfortable shoes win. If you are lifted in a chair, hold on and smile.",
    icon: "music",
  },
  {
    id: "late-night",
    title: "Late Night",
    scheduledTime: "2026-06-22T23:30:00-04:00",
    timeLabel: "11:30 PM",
    location: "Lounge & terrace",
    description: "A second wind: late-night bites, slower songs, and the people who never want to leave.",
    guestTip: "If you are still here, you are our people. Stay.",
    icon: "moon",
  },
];

export const liveTimelineIds = [
  "tisch",
  "kabbalat-panim",
  "chuppah",
  "sheva-brachot",
  "breaking-glass",
  "dancing",
  "dinner",
  "late-night",
] as const;

/**
 * Default live moment. Override at runtime from the Admin panel (Ctrl+Shift+6).
 * Valid values: schedule event ids, "auto", "pre", or "done".
 */
export const liveNowId: string | "auto" = "chuppah";

export type LiveNowId = string | "auto" | "pre" | "done";

export function getEventStatus(
  event: ScheduleEvent,
  nowId: string,
  all: ScheduleEvent[] = schedule,
): EventStatus {
  if (nowId === "pre") return "upcoming";
  if (nowId === "done") return "completed";
  const currentIndex = all.findIndex((item) => item.id === nowId);
  const eventIndex = all.findIndex((item) => item.id === event.id);
  if (eventIndex < 0) return "upcoming";
  if (eventIndex < currentIndex) return "completed";
  if (eventIndex === currentIndex) return "happening";
  return "upcoming";
}

export function resolveLiveNowId(now = new Date(), override?: LiveNowId): string {
  const id = override ?? liveNowId;
  if (id === "pre" || id === "done") return id;
  if (id !== "auto") return id;
  const timestamp = now.getTime();
  let current = schedule[0]?.id ?? "tisch";
  for (const event of schedule) {
    if (new Date(event.scheduledTime).getTime() <= timestamp) current = event.id;
  }
  return current;
}
