import type React from "react";
import { getCachedAuthenticUser } from "@/features/auth/session";
import { headers } from "next/headers";
import { UserProvider } from "@/shared/providers/user-provider";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/features/dashboard/components/AppSidebar";
import { NavUser } from "@/features/dashboard/components/NavUser";
import { Separator } from "@/shared/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import { ModalProvider } from "@/shared/providers/modal-provider";
import { ReactQueryProvider } from "@/shared/providers/react-query-provider";
import SubscriptionInactiveGate from "@/features/dashboard/components/SubscriptionInactiveGate";

export default async function layout({ children }: { children: React.ReactNode }) {
  const requestHeader = await headers();
  const id = requestHeader.get("x-user-id");
  const { user } = await getCachedAuthenticUser({ id });
  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/login");
  const userOnboarded = user;
  return (
    <div>
      <UserProvider initialData={userOnboarded}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-2 bg-white/90 dark:bg-[var(--color-dark-400)] transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1 cursor-pointer" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
              <div className="flex items-center gap-7 px-4">
                <NavUser />
              </div>
            </header>
            <ReactQueryProvider>
              <ModalProvider>
                <SubscriptionInactiveGate>{children}</SubscriptionInactiveGate>
              </ModalProvider>
            </ReactQueryProvider>
          </SidebarInset>
        </SidebarProvider>
      </UserProvider>
    </div>
  );
}
