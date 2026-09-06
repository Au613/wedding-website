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
    id: "arrive",
    title: "Guests Arrive",
    scheduledTime: "2026-10-12T12:00:00-04:00",
    timeLabel: "12:00 PM",
    location: "Felton Farm / Smith Barn",
    description: "The event begins. Come in, find someone smiling, and settle into the day.",
    guestTip: "You are on time. The day starts as you walk in.",
    icon: "users",
  },
  {
    id: "kabbalat-panim",
    title: "Kabbalat Panim",
    scheduledTime: "2026-10-12T12:00:00-04:00",
    timeLabel: "12:00–1:00 PM",
    location: "Bride's receiving room",
    description: "Alexa receives guests. Greeting, glamour, and the last calm before the veil.",
    guestTip: "Come say mazel tov, keep the receiving line moving, and save the long stories for later.",
    icon: "heart",
  },
  {
    id: "tisch",
    title: "Tisch Meal",
    scheduledTime: "2026-10-12T12:00:00-04:00",
    timeLabel: "12:00–1:00 PM",
    location: "Groom's salon",
    description: "Austin gathers with family and friends for a meal, a l'chaim, and pre-ceremony joy.",
    guestTip: "If you're invited to the tisch, come ready to sing. Everyone else: Kabbalat Panim is the place to be.",
    icon: "utensils",
  },
  {
    id: "tisch-speaking",
    title: "Tisch Speaking",
    scheduledTime: "2026-10-12T12:30:00-04:00",
    timeLabel: "12:30–1:00 PM",
    location: "Groom's salon",
    description: "Words of Torah, toasts, and a growing sense that this is really happening.",
    guestTip: "Listen in, sing along, and keep the energy high.",
    icon: "glass",
  },
  {
    id: "badeken",
    title: "Austin Dance to Alexa",
    scheduledTime: "2026-10-12T13:00:00-04:00",
    timeLabel: "1:00–1:10 PM",
    location: "Bride's receiving room",
    description: "Austin is danced to Alexa and veils her — intimate, ancient, and usually tearful.",
    guestTip: "Stand close enough to witness, quiet enough to let it be theirs.",
    icon: "flower",
  },
  {
    id: "processional",
    title: "Move to Ceremony",
    scheduledTime: "2026-10-12T13:10:00-04:00",
    timeLabel: "1:10–1:40 PM",
    location: "Toward the chuppah",
    description: "We make our way from the tisch and kabbalat panim to the chuppah lawn.",
    guestTip: "Follow ushers. There is time to find a seat before the ceremony begins.",
    icon: "users",
  },
  {
    id: "chuppah",
    title: "Ceremony",
    scheduledTime: "2026-10-12T13:45:00-04:00",
    timeLabel: "1:45–2:20 PM",
    location: "Garden chuppah lawn",
    description: "The wedding canopy. Ring, blessings, breaking the glass, and mazel tov.",
    guestTip: "Phones down during the ceremony if you can bear it. When the glass breaks, shout mazel tov.",
    icon: "spark",
  },
  {
    id: "yichud",
    title: "Yichud",
    scheduledTime: "2026-10-12T14:25:00-04:00",
    timeLabel: "2:25–2:40 PM",
    location: "Private yichud room",
    description: "A few quiet minutes alone as a married couple.",
    guestTip: "Hors d'oeuvres are next — we will find you.",
    icon: "heart",
  },
  {
    id: "cocktail",
    title: "Hors d'oeuvres + First Course",
    scheduledTime: "2026-10-12T14:40:00-04:00",
    timeLabel: "2:40–3:25 PM",
    location: "Smith Barn",
    description: "Passed bites and the first course while portraits wrap on the grounds.",
    guestTip: "Find a plate, find a friend, and enjoy. Dancing is next.",
    icon: "utensils",
  },
  {
    id: "dancing",
    title: "Dancing Round 1",
    scheduledTime: "2026-10-12T15:30:00-04:00",
    timeLabel: "3:30–4:10 PM",
    location: "Ballroom dance floor",
    description: "Hora, chair lifting, and the kind of dancing that does not require a plan.",
    guestTip: "Comfortable shoes win. If you are lifted in a chair, hold on and smile.",
    icon: "music",
  },
  {
    id: "dinner",
    title: "Entree",
    scheduledTime: "2026-10-12T16:10:00-04:00",
    timeLabel: "4:10–4:45 PM",
    location: "Grand ballroom",
    description: "The main course, a little catching of breath, and a table full of people ready to celebrate together.",
    guestTip: "Sit, eat, and save a little room. Dessert and more dancing are coming.",
    icon: "utensils",
  },
  {
    id: "late-night",
    title: "Dancing Round 2 + Dessert",
    scheduledTime: "2026-10-12T16:45:00-04:00",
    timeLabel: "4:45–5:40 PM",
    location: "Ballroom dance floor",
    description: "A second wind on the dance floor, plus dessert.",
    guestTip: "If you are still here, you are our people. Stay.",
    icon: "music",
  },
  {
    id: "sheva-brachot",
    title: "Benching + Sheva Brachot",
    scheduledTime: "2026-10-12T17:40:00-04:00",
    timeLabel: "5:40–6:00 PM",
    location: "Grand ballroom",
    description: "Grace after meals and the seven blessings of joy, recited by people we love.",
    guestTip: "Listen. If you know the responses, join softly. Details live on our Seven Brachot page.",
    icon: "glass",
  },
];

export const liveTimelineIds = [
  "arrive",
  "kabbalat-panim",
  "tisch",
  "tisch-speaking",
  "badeken",
  "processional",
  "chuppah",
  "yichud",
  "cocktail",
  "dancing",
  "dinner",
  "late-night",
  "sheva-brachot",
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
