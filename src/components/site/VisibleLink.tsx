"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAdmin } from "@/components/admin/AdminProvider";

export function VisibleLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const { isVisible } = useAdmin();
  if (!isVisible(href)) return null;
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
