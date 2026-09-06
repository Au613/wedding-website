export type PhotoKey =
  | "hero"
  | "storyMain"
  | "storyOne"
  | "storyTwo"
  | "storyThree"
  | "austin"
  | "alexa"
  | "live"
  | "dress"
  | "hotel"
  | "venue";

export const couple = {
  groom: {
    firstName: "Austin",
    lastName: "TBD",
    fullName: "Austin",
    shortBio:
      "Warm, curious, and always ready with a toast. Austin is happiest when the people he loves are in one room.",
    funFact: "Will absolutely cry during the badeken. Place your bingo bets now.",
  },
  bride: {
    firstName: "Alexa",
    lastName: "TBD",
    fullName: "Alexa",
    shortBio:
      "Elegant, sharp, and the reason the playlist will be exceptional. Alexa makes every gathering feel like a celebration.",
    funFact: "Can spot a college friend across a ballroom in under four seconds.",
  },
  names: "Austin & Alexa",
  monogram: "A & A",
  hashtag: "#AustinAndAlexa2026",
  welcomeEyebrow: "Welcome to our wedding",
  hebrewDate: "1 Cheshvan 5787",
  displayDate: "October 12, 2026",
  datetime: "2026-10-12T12:00:00-04:00",
  timezone: "America/New_York",
  venueName: "Felton Farm / Smith Barn",
  venueCity: "Peabody, Massachusetts",
  venueAddress: "38 Felton St, Peabody, MA 01960",
  instagram: "https://instagram.com",
  whatsapp: "https://wa.me/",
  registryUrl: "https://www.amazon.com/wedding/guest-view/DAL3CJRT9UT8",
  welcomeMessage:
    "We cannot wait to gather our favorite people under one chuppah. This site is your companion for the weekend: what to expect, where to be, and a few games for good measure.",
  photos: {
    hero: "/photos/hero.jpg",
    storyMain: "/photos/portrait.jpg",
    storyOne: "/photos/walking.jpg",
    storyTwo: "/photos/ring.jpg",
    storyThree: "/photos/portrait.jpg",
    austin: "/photos/austin.jpg",
    alexa: "/photos/alexa.jpg",
    live: "/photos/live.jpg",
    dress: "/photos/ring.jpg",
    hotel: "/photos/walking.jpg",
    venue: "/photos/walking.jpg",
  } satisfies Record<PhotoKey, string>,
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/guide", label: "Guide" },
  { href: "/schedule", label: "Schedule" },
  { href: "/travel", label: "Travel" },
  { href: "/faq", label: "FAQ" },
  { href: "/games", label: "Games" },
  { href: "/more", label: "More" },
] as const;

export const mobileTabItems = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/guide", label: "Guide", icon: "guide" },
  { href: "/games", label: "Games", icon: "games" },
  { href: "/more", label: "More", icon: "more" },
] as const;

export const quickLinks = [
  { href: "/story", label: "Our Story", description: "How we got here" },
  { href: "/guide", label: "What to Expect", description: "A gentle walkthrough" },
  { href: "/travel", label: "Venue & Travel", description: "Stay, park, arrive" },
  { href: "/schedule", label: "Schedule", description: "The day's rhythm" },
  { href: "/games", label: "Games Hub", description: "Trivia, bingo, and more" },
] as const;
