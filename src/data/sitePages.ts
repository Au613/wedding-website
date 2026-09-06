export type SitePage = {
  href: string;
  label: string;
  group: "nav" | "more" | "games";
  locked?: boolean;
};

export const sitePages: SitePage[] = [
  { href: "/", label: "Home", group: "nav", locked: true },
  { href: "/story", label: "Our Story", group: "nav" },
  { href: "/gallery", label: "Gallery", group: "nav" },
  { href: "/guide", label: "Guide", group: "nav" },
  { href: "/schedule", label: "Schedule", group: "nav" },
  { href: "/travel", label: "Travel", group: "nav" },
  { href: "/faq", label: "FAQ", group: "nav" },
  { href: "/games", label: "Games", group: "nav" },
  { href: "/more", label: "More", group: "nav" },
  { href: "/live", label: "Live Wedding Mode", group: "more" },
  { href: "/dress-code", label: "Dress Code", group: "more" },
  { href: "/venue", label: "Venue Map", group: "more" },
  { href: "/brachot", label: "Seven Brachot", group: "more" },
  { href: "/guestbook", label: "Guest Book", group: "more" },
  { href: "/photos", label: "Share Photos", group: "more" },
  { href: "/menu", label: "Menu & Voting", group: "more" },
  { href: "/celebrate", label: "Celebrating Too?", group: "more" },
  { href: "/games/trivia", label: "Couple Trivia", group: "games" },
  { href: "/games/bingo", label: "Wedding Bingo", group: "games" },
  { href: "/games/bracket", label: "Tournament Bracket", group: "games" },
  { href: "/games/face-off", label: "Friend Face-Off", group: "games" },
];

export const moreLinks = [
  { href: "/live", title: "Live Wedding Mode" },
  { href: "/dress-code", title: "Dress Code" },
  { href: "/venue", title: "Venue Map" },
  { href: "/brachot", title: "Seven Brachot" },
  { href: "/guestbook", title: "Guest Book" },
  { href: "/photos", title: "Share Photos" },
  { href: "/menu", title: "Menu & Voting" },
  { href: "/celebrate", title: "Celebrating Too?" },
] as const;

export function defaultPageVisibility() {
  return Object.fromEntries(sitePages.map((page) => [page.href, true])) as Record<string, boolean>;
}

export function isPathVisible(pathname: string, visibility: Record<string, boolean>) {
  const relevant = sitePages.filter((page) => {
    if (page.href === "/") return pathname === "/";
    return pathname === page.href || pathname.startsWith(`${page.href}/`);
  });
  if (relevant.some((page) => visibility[page.href] === false)) return false;
  return true;
}
