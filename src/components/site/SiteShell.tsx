"use client";

import type { ReactNode } from "react";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { PageGuard } from "@/components/admin/PageGuard";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
      </div>
      <PageGuard />
      <AdminPanel />
    </AdminProvider>
  );
}
