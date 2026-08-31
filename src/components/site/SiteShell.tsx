"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { StoryEditor } from "@/components/admin/StoryEditor";
import { PageGuard } from "@/components/admin/PageGuard";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <SiteFrame>{children}</SiteFrame>
      <PageGuard />
      <AdminPanel />
      <StoryEditor />
    </AdminProvider>
  );
}

function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const fillViewport = pathname === "/venue" || pathname === "/live";

  return (
    <div className={fillViewport ? "flex h-dvh flex-col overflow-hidden" : "flex min-h-screen flex-col"}>
      <Header />
      <main className={fillViewport ? "flex min-h-0 flex-1 flex-col overflow-hidden" : "flex-1"}>{children}</main>
      {fillViewport ? null : <Footer />}
      <MobileNav />
    </div>
  );
}
