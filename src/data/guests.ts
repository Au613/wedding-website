export type GuestSide = "bride" | "groom" | "both";
export type GuestGroup =
  | "family"
  | "friends"
  | "college"
  | "work"
  | "wedding-party"
  | "other";

export type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  relation: string;
  side: GuestSide;
  group: GuestGroup;
  table: number;
  hometown: string;
  college?: string;
  workplace?: string;
  note: string;
  bio: string;
  howTheyKnow: string;
  funFact: string;
  youMightKnow?: string[];
};

export const guestFilters = [
  { id: "all", label: "All" },
  { id: "family", label: "Family" },
  { id: "friends", label: "Friends" },
  { id: "bride", label: "Bride's Side" },
  { id: "groom", label: "Groom's Side" },
  { id: "college", label: "College Friends" },
  { id: "work", label: "Work" },
  { id: "other", label: "Other" },
] as const;

export const guests: Guest[] = [
  {
    id: "rebecca-cohen",
    firstName: "Rebecca",
    lastName: "Cohen",
    relation: "Alexa's cousin",
    side: "bride",
    group: "family",
    table: 3,
    hometown: "Teaneck, NJ",
    college: "Barnard",
    note: "Will absolutely start the first circle on the dance floor.",
    bio: "Rebecca is Alexa's cousin and unofficial director of family logistics.",
    howTheyKnow: "Family of the bride — summers, seders, and shared cousins' group chats.",
    funFact: "Has a signature l'chaim that rhymes.",
    youMightKnow: ["noah-stein", "maya-gold"],
  },
  {
    id: "noah-stein",
    firstName: "Noah",
    lastName: "Stein",
    relation: "Austin's brother",
    side: "groom",
    group: "family",
    table: 1,
    hometown: "Brookline, MA",
    college: "Penn",
    workplace: "A teaching hospital, somehow",
    note: "Best man energy, even when he insists he is 'just a brother.'",
    bio: "Noah has been Austin's first audience since the beginning.",
    howTheyKnow: "Family of the groom.",
    funFact: "Can name every camp nickname Austin has ever had.",
    youMightKnow: ["samuel-ben", "olivia-shapiro"],
  },
  {
    id: "maya-gold",
    firstName: "Maya",
    lastName: "Gold",
    relation: "Bridesmaid",
    side: "bride",
    group: "wedding-party",
    table: 4,
    hometown: "Los Angeles, CA",
    college: "UCLA",
    note: "Keeper of the emergency sewing kit and the good playlist.",
    bio: "Maya and Alexa have been inseparable since freshman year.",
    howTheyKnow: "College friends who became chosen family.",
    funFact: "Once planned a surprise Shabbat in three cities.",
    youMightKnow: ["rebecca-cohen", "leah-azoulay"],
  },
  {
    id: "samuel-ben",
    firstName: "Samuel",
    lastName: "Ben-David",
    relation: "Groomsman",
    side: "groom",
    group: "wedding-party",
    table: 2,
    hometown: "New York, NY",
    college: "Columbia",
    workplace: "A very serious firm with a very unserious Slack.",
    note: "Will give a toast. It will be good. It may also be long.",
    bio: "Sam met Austin in a lecture they both immediately left.",
    howTheyKnow: "College and then every Tuesday night since.",
    funFact: "Claims he introduced them. He did not.",
    youMightKnow: ["noah-stein", "daniel-weiss"],
  },
  {
    id: "olivia-shapiro",
    firstName: "Olivia",
    lastName: "Shapiro",
    relation: "Family friend",
    side: "both",
    group: "friends",
    table: 6,
    hometown: "Scarsdale, NY",
    note: "Knows both families and will make introductions with joy.",
    bio: "Olivia has a gift for remembering everyone's plus-one.",
    howTheyKnow: "A family friendship that predates the couple.",
    funFact: "Brings the best hostess gift and refuses to take credit.",
    youMightKnow: ["hannah-levi", "rebecca-cohen"],
  },
  {
    id: "daniel-weiss",
    firstName: "Daniel",
    lastName: "Weiss",
    relation: "College friend",
    side: "groom",
    group: "college",
    table: 8,
    hometown: "Chicago, IL",
    college: "Michigan",
    note: "Here for the hora and the late-night fries.",
    bio: "Danny and Austin survived organic chemistry and several questionable road trips.",
    howTheyKnow: "College friends from the groom's side.",
    funFact: "Still owes Austin a smoothie from 2019.",
    youMightKnow: ["samuel-ben", "jordan-kim"],
  },
  {
    id: "leah-azoulay",
    firstName: "Leah",
    lastName: "Azoulay",
    relation: "Work friend",
    side: "bride",
    group: "work",
    table: 9,
    hometown: "Paris, France",
    workplace: "A design studio with excellent taste",
    note: "Will notice the florals before anyone else.",
    bio: "Leah and Alexa became close over impossible deadlines and better coffee.",
    howTheyKnow: "Colleagues who accidentally became real friends.",
    funFact: "Can identify a font from across a ballroom.",
    youMightKnow: ["maya-gold", "priya-raman"],
  },
  {
    id: "hannah-levi",
    firstName: "Hannah",
    lastName: "Levi",
    relation: "Alexa's aunt",
    side: "bride",
    group: "family",
    table: 3,
    hometown: "Jerusalem",
    note: "Gives the best brachot and the warmest hugs.",
    bio: "Hannah has been at every milestone, usually with extra dessert.",
    howTheyKnow: "Family of the bride.",
    funFact: "Will teach you a Yemenite dance if you make eye contact.",
    youMightKnow: ["rebecca-cohen", "eli-mizrahi"],
  },
  {
    id: "jordan-kim",
    firstName: "Jordan",
    lastName: "Kim",
    relation: "Friend from camp",
    side: "groom",
    group: "friends",
    table: 7,
    hometown: "Atlanta, GA",
    note: "Knows the camp songs. Will use them.",
    bio: "Jordan and Austin go back to color war and one legendary canoe.",
    howTheyKnow: "Summer camp, then lifelong group chat.",
    funFact: "Still has the original friendship bracelet.",
    youMightKnow: ["daniel-weiss", "noah-stein"],
  },
  {
    id: "priya-raman",
    firstName: "Priya",
    lastName: "Raman",
    relation: "Neighbor & friend",
    side: "both",
    group: "friends",
    table: 10,
    hometown: "Boston, MA",
    workplace: "A kitchen where the challah is famous",
    note: "Brought the energy to every Friendsgiving.",
    bio: "Priya lives downstairs and somehow became family.",
    howTheyKnow: "Neighbors who share spices, keys, and holidays.",
    funFact: "Makes a kugel that has caused actual arguments.",
    youMightKnow: ["leah-azoulay", "olivia-shapiro"],
  },
  {
    id: "eli-mizrahi",
    firstName: "Eli",
    lastName: "Mizrahi",
    relation: "Family of bride",
    side: "bride",
    group: "family",
    table: 5,
    hometown: "Miami, FL",
    note: "Will be on the dance floor before the salad course.",
    bio: "Eli is the cousin who remembers every childhood story Alexa would rather forget.",
    howTheyKnow: "Family of the bride.",
    funFact: "Has a secret handshake with Alexa from 2009.",
    youMightKnow: ["hannah-levi", "rebecca-cohen"],
  },
  {
    id: "sarah-brook",
    firstName: "Sarah",
    lastName: "Brook",
    relation: "Colleague",
    side: "groom",
    group: "work",
    table: 11,
    hometown: "Washington, DC",
    workplace: "A nonprofit that actually replies to emails",
    note: "Kind, funny, and already researching the hora.",
    bio: "Sarah and Austin became friends the way coworkers do: over too much coffee.",
    howTheyKnow: "Work friends from the groom's side.",
    funFact: "Practiced the chair lift. Once. It went fine.",
    youMightKnow: ["samuel-ben", "daniel-weiss"],
  },
];

export function guestName(guest: Guest) {
  return `${guest.firstName} ${guest.lastName}`;
}

export function groupLabel(group: GuestGroup) {
  switch (group) {
    case "family":
      return "Family";
    case "friends":
      return "Friends";
    case "college":
      return "College Friends";
    case "work":
      return "Work";
    case "wedding-party":
      return "Wedding Party";
    default:
      return "Other";
  }
}

export function sideLabel(side: GuestSide) {
  if (side === "bride") return "Family of Bride";
  if (side === "groom") return "Family of Groom";
  return "Both sides";
}
