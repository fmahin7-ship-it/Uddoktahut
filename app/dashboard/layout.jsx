import { getAuthenticUser } from "@/lib/actions/auth.action";
import { headers } from "next/headers";
import { UserProvider } from "../context/UserContext";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { NavUser } from "@/components/dashboard/NavUser";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModalProvider } from "@/app/context/ModalContext";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";

export default async function layout({ children }) {
  const requestHeader = await headers();
  const id = requestHeader.get("x-user-id");
  const { user } = await getAuthenticUser({ id });
  if (!user) redirect("/logout");
  if (!user.onboarded) redirect("/logout");
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
                {user.isActive ? children : "Get subscription please"}
              </ModalProvider>
            </ReactQueryProvider>
          </SidebarInset>
        </SidebarProvider>
      </UserProvider>
    </div>
  );
}
