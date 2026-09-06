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
    id: "kabbalat-panim",
    number: 1,
    title: "Kabbalat Panim",
    hebrew: "קבלת פנים",
    duration: "About 1 hour",
    whatHappens:
      "The bride receives guests in a beautifully set room. Think: a queen's reception with better lighting.",
    whyItMatters:
      "It's a formal greeting that says: you are not just attendees. You are our honored guests.",
    whatGuestsDo:
      "Offer a warm mazel tov and grab a hug from the bride.",
    icon: "spark",
  },
  {
    id: "tisch",
    number: 2,
    title: "Tisch",
    hebrew: "טיש",
    duration: "About 1 hour",
    whatHappens:
      "The groom sits with family and friends. There are words of Torah, singing, and a growing sense that this is really happening.",
    whyItMatters:
      "It's a last gathering as a groomsman among groomsmen — joy with a little gravity.",
    whatGuestsDo:
      "Sing along, and keep the energy high. If not, head to Kabbalat Panim.",
    icon: "table",
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
      "Gather close, and watch the couple have the moment after a few difficult days apart. Tissues recommended.",
    icon: "veil",
  },
  {
    id: "chuppah",
    number: 4,
    title: "The Chuppah",
    hebrew: "חופה",
    duration: "About 35 minutes",
    whatHappens:
      "We stand beneath a canopy open on all four sides. The ceremony unfolds in Hebrew and English.",
    whyItMatters:
      "The chuppah is our first home: open to guests, held up by the people we love, and just a little bit windswept.",
    whatGuestsDo:
      "Seating is mixed gendered so find a place with a view, and settle in. This is the heart of the day.",
    icon: "canopy",
  },
  {
    id: "kiddushin",
    number: 5,
    title: "Kiddushin",
    hebrew: "קידושין",
    duration: "A few minutes",
    whatHappens:
      "A blessing over wine, a ring placed on the bride's finger, and the ancient words of consecration.",
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
      "A glass is placed on the ground and broken. The room erupts in cheers.",
    whyItMatters:
      "Even at the height of joy, we remember that the world is unfinished — and still, we choose to celebrate.",
    whatGuestsDo:
      "When the glass breaks, shout mazel tov. Then the dancing can begin.",
    icon: "glass",
  },
  {
    id: "yichud",
    number: 8,
    title: "Yichud",
    hebrew: "יחוד",
    duration: "About 15 minutes",
    whatHappens:
      "The couple is danced away to a private room. Witnesses stand outside. Inside: water, snacks, and a first break together as a married couple.",
    whyItMatters:
      "After a very public ritual, Jewish tradition gives the couple a secluded beginning.",
    whatGuestsDo:
      "Hors d'oeuvres and the first course are your next stop. We will find you.",
    icon: "door",
  },
  {
    id: "dancing",
    number: 9,
    title: "Dancing",
    duration: "Rounds through the afternoon",
    whatHappens:
      "Dinner, toasts, the hora, chairs in the air, and dancing that lasts longer than anyone planned.",
    whyItMatters:
      "The ceremony made us married. The dancing makes it a wedding.",
    whatGuestsDo:
      "Eat, dance, introduce yourself to someone new, and stay as long as you'd like.",
    icon: "dance",
  },
];
