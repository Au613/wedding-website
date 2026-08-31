"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CircleEllipsis, Gamepad2, Home, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/components/admin/AdminProvider";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/guide", label: "Guide", icon: BookOpen },
  { href: "/guests", label: "Guests", icon: Users },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/more", label: "More", icon: CircleEllipsis },
];

export function MobileNav() {
  const pathname = usePathname();
  const { isVisible } = useAdmin();
  if (pathname.startsWith("/live")) return null;

  const visibleTabs = tabs.filter((tab) => isVisible(tab.href));
  if (visibleTabs.length === 0) return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Mobile"
    >
      <ul className="grid" style={{ gridTemplateColumns: `repeat(${visibleTabs.length}, minmax(0, 1fr))` }}>
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[0.65rem] uppercase tracking-[0.12em]",
                  active ? "text-burgundy" : "text-ink-faint",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
