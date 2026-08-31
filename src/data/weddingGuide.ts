export type GuideStage = {
  id: string;
  number: number;
  title: string;
  hebrew?: string;
  duration: string;
  whatHappens: string;
  whyItMatters: string;
  whatGuestsDo: string;
  icon: "table" | "spark" | "veil" | "canopy" | "ring" | "blessing" | "glass" | "door" | "dance";
};

export const weddingGuide: GuideStage[] = [
  {
    id: "tisch",
    number: 1,
    title: "Tisch",
    hebrew: "טיש",
    duration: "About 20 minutes",
    whatHappens:
      "The groom sits with family and friends. There are words of Torah, singing, whiskey, and a growing sense that this is really happening.",
    whyItMatters:
      "It's a last gathering as a groomsman among groomsmen — joy with a little gravity.",
    whatGuestsDo:
      "If you're invited, squeeze in, sing along, and keep the l'chaims coming. If not, head to Kabbalat Panim.",
    icon: "table",
  },
  {
    id: "kabbalat-panim",
    number: 2,
    title: "Kabbalat Panim",
    hebrew: "קבלת פנים",
    duration: "About 20 minutes",
    whatHappens:
      "The bride receives guests in a beautifully set room. Think: queen for an evening, with better lighting.",
    whyItMatters:
      "It's a formal greeting that says: you are not just attendees. You are our community.",
    whatGuestsDo:
      "Offer a warm mazel tov, keep it brief, and leave room for the next hug.",
    icon: "spark",
  },
  {
    id: "badeken",
    number: 3,
    title: "Badeken",
    hebrew: "בדעקן",
    duration: "About 10 minutes",
    whatHappens:
      "The groom is danced toward the bride and veils her. The room usually gets very quiet, then very emotional.",
    whyItMatters:
      "It echoes the moment Jacob was deceived by a veil — and becomes a tender act of seeing and covering, all at once.",
    whatGuestsDo:
      "Gather close, stay present, and let the couple have the moment. Tissues recommended.",
    icon: "veil",
  },
  {
    id: "chuppah",
    number: 4,
    title: "The Chuppah",
    hebrew: "חופה",
    duration: "About 20–30 minutes",
    whatHappens:
      "We stand beneath a canopy open on all four sides. Family holds the poles. The ceremony unfolds in Hebrew and English.",
    whyItMatters:
      "The chuppah is our first home: open to guests, held up by the people we love, and just a little bit windswept.",
    whatGuestsDo:
      "Follow ushers, find a place with a view, and settle in. This is the heart of the day.",
    icon: "canopy",
  },
  {
    id: "kiddushin",
    number: 5,
    title: "Kiddushin",
    hebrew: "קידושין",
    duration: "A few minutes",
    whatHappens:
      "A blessing over wine, a ring placed on the bride's finger, and the Aramaic words of consecration.",
    whyItMatters:
      "This is the legal and spiritual betrothal. After this, we are not simply promising. We are bound.",
    whatGuestsDo:
      "Watch the ring. You may not catch every word, and you do not need to. The meaning is in the gesture.",
    icon: "ring",
  },
  {
    id: "sheva-brachot",
    number: 6,
    title: "Sheva Brachot",
    hebrew: "שבע ברכות",
    duration: "About 8 minutes",
    whatHappens:
      "Seven blessings are recited over a second cup of wine, often by honored friends and family.",
    whyItMatters:
      "They widen the moment from two people to creation, community, and the joy of Zion itself.",
    whatGuestsDo:
      "Listen. If you know the responses, join softly. Details live on our Seven Brachot page.",
    icon: "blessing",
  },
  {
    id: "breaking-glass",
    number: 7,
    title: "Breaking the Glass",
    hebrew: "שבירת הכוס",
    duration: "A few seconds, a lifetime of photos",
    whatHappens:
      "A glass is placed on the ground and broken. The room erupts with mazel tov.",
    whyItMatters:
      "Even at the height of joy, we remember that the world is unfinished — and still, we choose to celebrate.",
    whatGuestsDo:
      "When the glass breaks, shout mazel tov. Then we kiss, and the dancing can begin.",
    icon: "glass",
  },
  {
    id: "yichud",
    number: 8,
    title: "Yichud",
    hebrew: "יחוד",
    duration: "About 10–15 minutes",
    whatHappens:
      "The couple steps away to a private room. Witnesses stand outside. Inside: water, a first married breath, maybe french fries.",
    whyItMatters:
      "After a very public ritual, Jewish tradition gives the couple a secluded beginning.",
    whatGuestsDo:
      "Do not wait at the door. Cocktail hour is your next stop. We will find you.",
    icon: "door",
  },
  {
    id: "dancing",
    number: 9,
    title: "Dancing / Reception",
    duration: "The rest of the night",
    whatHappens:
      "Dinner, toasts, the hora, chairs in the air, and dancing that lasts longer than anyone planned.",
    whyItMatters:
      "The ceremony made us married. The dancing makes it a wedding.",
    whatGuestsDo:
      "Eat, dance, introduce yourself to someone new, and stay for late night if you can.",
    icon: "dance",
  },
];
