"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdmin } from "./AdminProvider";

export function PageGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, isVisible } = useAdmin();

  useEffect(() => {
    if (!ready) return;
    if (!isVisible(pathname)) router.replace("/");
  }, [isVisible, pathname, ready, router]);

  return null;
}
