export const storageKeys = {
  bingo: "aa-bingo",
  trivia: "aa-trivia",
  bracket: "aa-bracket",
  faceOff: "aa-faceoff",
  guestbook: "aa-guestbook",
  photos: "aa-photos",
  menuVotes: "aa-menu-votes",
  celebrations: "aa-celebrations",
  leaderboard: "aa-leaderboard",
  admin: "aa-admin",
} as const;

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function addPoints(guestName: string, points: number, badge?: string) {
  const board = readJson<Array<{ name: string; points: number; badges: string[] }>>(
    storageKeys.leaderboard,
    [],
  );
  const existing = board.find((row) => row.name === guestName);
  if (existing) {
    existing.points += points;
    if (badge && !existing.badges.includes(badge)) existing.badges.push(badge);
  } else {
    board.push({ name: guestName, points, badges: badge ? [badge] : [] });
  }
  board.sort((a, b) => b.points - a.points);
  writeJson(storageKeys.leaderboard, board);
  return board;
}
