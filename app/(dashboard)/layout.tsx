import type React from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Providers } from "@/providers/queryProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-screen">
      <Providers>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </Providers>
    </div>
  );
}
