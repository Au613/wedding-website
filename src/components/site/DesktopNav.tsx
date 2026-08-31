"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/couple";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/components/admin/AdminProvider";

export function DesktopNav({ light = false }: { light?: boolean }) {
  const pathname = usePathname();
  const { isVisible } = useAdmin();

  return (
    <nav className="hidden lg:block" aria-label="Primary">
      <ul className="flex items-center gap-5">
        {navItems.filter((item) => isVisible(item.href)).map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative text-[0.7rem] uppercase tracking-[0.22em] transition",
                  light ? "text-cream-soft/80 hover:text-cream-soft" : "text-ink-muted hover:text-burgundy",
                  active && (light ? "text-gold-pale" : "text-burgundy"),
                )}
              >
                {item.label}
                {active ? (
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 h-px w-full",
                      light ? "bg-gold-pale" : "bg-burgundy",
                    )}
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
