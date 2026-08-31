"use client";

import Link from "next/link";
import { BookHeart, HelpCircle, Shirt, Sparkles } from "lucide-react";
import { GameCard } from "@/components/games/GameCard";
import { Leaderboard } from "@/components/games/Leaderboard";
import { Card } from "@/components/ui/card";
import { useAdmin } from "@/components/admin/AdminProvider";

const games = [
  { href: "/games/trivia", title: "Couple Trivia", description: "How well do you know us?", icon: Sparkles },
  { href: "/games/bingo", title: "Wedding Bingo", description: "Spot it. Snap it. Win!", icon: BookHeart },
  { href: "/games/bracket", title: "Tournament Bracket", description: "Wedding predictions. Who will win?", icon: Shirt },
  { href: "/games/face-off", title: "Friend Face-Off", description: "Austin or Alexa — which team wins?", icon: HelpCircle },
];

const extras = [
  { href: "/guestbook", label: "guest book" },
  { href: "/photos", label: "photos" },
  { href: "/menu", label: "menu vote" },
  { href: "/venue", label: "map" },
];

export function GamesHub() {
  const { isVisible } = useAdmin();
  const visibleGames = games.filter((game) => isVisible(game.href));
  const visibleExtras = extras.filter((item) => isVisible(item.href));

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {visibleGames.map((game) => {
          const Icon = game.icon;
          return (
            <GameCard key={game.href} href={game.href} title={game.title} description={game.description} icon={<Icon />} />
          );
        })}
      </div>
      <div className="mt-10">
        <Leaderboard />
      </div>
      {visibleExtras.length ? (
        <Card className="mt-8 p-6">
          <p className="text-sm text-ink-muted">
            Looking for quieter joys? Try the{" "}
            {visibleExtras.map((item, index) => (
              <span key={item.href}>
                <Link href={item.href} className="text-burgundy underline">
                  {item.label}
                </Link>
                {index < visibleExtras.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </Card>
      ) : null}
    </>
  );
}
