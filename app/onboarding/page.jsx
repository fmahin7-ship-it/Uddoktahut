import dynamic from "next/dynamic";
import { StepperProvider } from "../context/StepperContext";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { NavUser } from "@/components/dashboard/NavUser";
import { headers } from "next/headers";
import { UserProvider } from "../context/UserContext";
import { getAuthenticUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

// Lazy load Stepper component for better performance
const Stepper = dynamic(() => import("@/components/stepper/Stepper"), {
  loading: () => (
    <div className="animate-pulse space-y-6 p-6">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
      <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="flex justify-between">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  ),
});

export default async function Onboarding() {
  const requestHeader = await headers();
  const id = requestHeader.get("x-user-id");
  const { user } = await getAuthenticUser({ id });
  if (!user) redirect("/logout");
  const userOnboarded = user;
  return (
    <main className="p-6">
      <UserProvider initialData={userOnboarded}>
        <StepperProvider>
          <SidebarProvider>
            <SidebarInset>
              <header
                className="flex h-16 shrink-0 items-center justify-between 
                            gap-2 transition-[width,height] relative
                            ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
              >
                <div className="absolute flex items-center gap-7 px-4 right-0">
                  <NavUser isOnboarded={false} />
                </div>
              </header>
              <Stepper />
            </SidebarInset>
          </SidebarProvider>
        </StepperProvider>
      </UserProvider>
    </main>
  );
}
