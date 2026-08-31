"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { couple, navItems } from "@/data/couple";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Monogram } from "./Monogram";
import { DesktopNav } from "./DesktopNav";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isLive = pathname.startsWith("/live");
  const { isVisible } = useAdmin();
  const items = navItems.filter((item) => isVisible(item.href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md",
        isLive ? "border-white/10 bg-burgundy-dark/90" : "border-gold/15 bg-cream/90",
      )}
    >
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Monogram size="sm" light={isLive} />
          <span
            className={cn(
              "text-xs font-medium uppercase tracking-[0.28em]",
              isLive ? "text-cream-soft" : "text-ink",
            )}
          >
            {couple.names}
          </span>
        </Link>
        <DesktopNav light={isLive} />
        <button
          type="button"
          className={cn("lg:hidden", isLive ? "text-cream-soft" : "text-burgundy")}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-gold/15 bg-cream px-4 py-4 lg:hidden">
          <ul className="grid gap-1">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-3 py-3 text-sm uppercase tracking-[0.18em]",
                      active ? "bg-burgundy-mist text-burgundy" : "text-ink-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
