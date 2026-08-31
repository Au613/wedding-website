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
    id: "cocktail",
    title: "Cocktail Hour",
    scheduledTime: "2026-10-12T12:00:00-04:00",
    timeLabel: "12–1 PM",
    location: "Terrace & lawn",
    description: "Passed bites, first reunions, and the photo booth warming up.",
    guestTip: "This is the best time to say hello to people you have not seen in years.",
    icon: "utensils",
  },
  {
    id: "tisch",
    title: "Tisch",
    scheduledTime: "2026-10-12T13:00:00-04:00",
    timeLabel: "1:00 PM",
    location: "Groom's salon",
    description: "Austin gathers with family and friends for words of Torah, a l'chaim, and a little pre-ceremony joy.",
    guestTip: "If you're invited to the tisch, come ready to sing. Everyone else: Kabbalat Panim is the place to be.",
    icon: "glass",
  },
  {
    id: "kabbalat-panim",
    title: "Kabbalat Panim",
    scheduledTime: "2026-10-12T13:00:00-04:00",
    timeLabel: "1:00 PM",
    location: "Bride's receiving room",
    description: "Alexa receives guests like royalty. This is greeting, glamour, and the last calm before the veil.",
    guestTip: "Come say mazel tov, keep the receiving line moving, and save the long stories for later.",
    icon: "heart",
  },
  {
    id: "badeken",
    title: "Badeken",
    scheduledTime: "2026-10-12T13:30:00-04:00",
    timeLabel: "1:30 PM",
    location: "Bride's receiving room",
    description: "Austin veils Alexa — a moment that is intimate, ancient, and usually tearful.",
    guestTip: "Stand close enough to witness, quiet enough to let it be theirs.",
    icon: "flower",
  },
  {
    id: "chuppah",
    title: "Chuppah",
    scheduledTime: "2026-10-12T14:00:00-04:00",
    timeLabel: "2:00 PM",
    location: "Garden chuppah lawn",
    description: "The wedding canopy. Open on all sides, like the home we hope to build.",
    guestTip: "Follow ushers toward the lawn. Phones down during the ceremony if you can bear it.",
    icon: "spark",
  },
  {
    id: "kiddushin",
    title: "Kiddushin",
    scheduledTime: "2026-10-12T14:10:00-04:00",
    timeLabel: "2:10 PM",
    location: "Under the chuppah",
    description: "The betrothal: a ring, a blessing over wine, and the words that make this official.",
    guestTip: "You'll hear Hebrew, see a ring, and feel the air change. That's the moment.",
    icon: "heart",
  },
  {
    id: "sheva-brachot",
    title: "Sheva Brachot",
    scheduledTime: "2026-10-12T14:30:00-04:00",
    timeLabel: "2:30 PM",
    location: "Under the chuppah",
    description: "Seven blessings of joy, recited by people we love.",
    guestTip: "Listen for the themes: wine, creation, companionship, and a whole lot of joy.",
    icon: "spark",
  },
  {
    id: "breaking-glass",
    title: "Breaking the Glass",
    scheduledTime: "2026-10-12T14:45:00-04:00",
    timeLabel: "2:45 PM",
    location: "Under the chuppah",
    description: "A glass breaks, the room shouts mazel tov, and we are married.",
    guestTip: "When you hear the glass, that's your cue: Mazel tov!",
    icon: "glass",
  },
  {
    id: "yichud",
    title: "Yichud",
    scheduledTime: "2026-10-12T14:50:00-04:00",
    timeLabel: "2:50 PM",
    location: "Private yichud room",
    description: "A few quiet minutes alone as a married couple.",
    guestTip: "Do not wait for us at the door. We will find you when we return.",
    icon: "heart",
  },
  {
    id: "dinner",
    title: "Dinner",
    scheduledTime: "2026-10-12T15:00:00-04:00",
    timeLabel: "3:00 PM",
    location: "Grand ballroom",
    description: "A kosher dinner, toasts, and a little catching of breath.",
    guestTip: "If you have a toast, keep it kind, short, and destined for the microphone — not the table.",
    icon: "utensils",
  },
  {
    id: "dancing",
    title: "Dancing",
    scheduledTime: "2026-10-12T15:00:00-04:00",
    timeLabel: "3:00 PM",
    location: "Ballroom dance floor",
    description: "Hora, chair lifting, and the kind of dancing that does not require a plan.",
    guestTip: "Comfortable shoes win. If you are lifted in a chair, hold on and smile.",
    icon: "music",
  },
  {
    id: "late-night",
    title: "Dancing, Round 2",
    scheduledTime: "2026-10-12T16:00:00-04:00",
    timeLabel: "4:00 PM",
    location: "Ballroom dance floor",
    description: "A second wind on the dance floor — slower songs, favorite hits, and the people who never want to leave.",
    guestTip: "If you are still here, you are our people. Stay.",
    icon: "music",
  },
];

export const liveTimelineIds = [
  "cocktail",
  "tisch",
  "kabbalat-panim",
  "badeken",
  "chuppah",
  "sheva-brachot",
  "breaking-glass",
  "dinner",
  "dancing",
  "late-night",
] as const;

export function liveTimelineEvents() {
  return liveTimelineIds
    .map((id) => schedule.find((event) => event.id === id))
    .filter((event): event is ScheduleEvent => Boolean(event));
}

export function resolveLiveStripId(nowId: string) {
  if (nowId === "pre" || nowId === "done") return nowId;
  if ((liveTimelineIds as readonly string[]).includes(nowId)) return nowId;
  const fullIndex = schedule.findIndex((event) => event.id === nowId);
  if (fullIndex < 0) return nowId;
  let mapped: string = liveTimelineIds[0];
  for (const id of liveTimelineIds) {
    const index = schedule.findIndex((event) => event.id === id);
    if (index <= fullIndex) mapped = id;
  }
  return mapped;
}

export const liveControlSteps: LiveNowId[] = ["pre", ...liveTimelineIds, "done"];

export function nextLiveStep(current: LiveNowId): LiveNowId {
  const id = current === "auto" ? "pre" : resolveLiveStripId(String(current));
  const index = liveControlSteps.indexOf(id);
  if (index < 0) return liveControlSteps[0];
  return liveControlSteps[Math.min(index + 1, liveControlSteps.length - 1)];
}

/**
 * Default live moment. Override at runtime from the Admin panel (Ctrl+Shift+6).
 * Valid values: schedule event ids, "auto", "pre", or "done".
 */
export const liveNowId: string | "auto" = "pre";

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
