"use client";

import * as React from "react";
import { useMemo } from "react";
import {
  Settings2,
  ShoppingBagIcon,
  SquareTerminal,
  BarChart3,
} from "lucide-react";
import { useUser } from "@/app/context/UserContext";
import { NavMain } from "@/components/dashboard/NavMain";
import { TeamSwitcher } from "@/components/dashboard/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const BASE_NAV = [
  {
    title: "Products",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [{ title: "Product Management", url: "/dashboard" }],
  },
  {
    title: "Orders",
    url: "#",
    icon: ShoppingBagIcon,
    items: [{ title: "Order Management", url: "/dashboard/orders" }],
  },
  {
    title: "AI Analytics",
    url: "#",
    icon: BarChart3,
    items: [{ title: "Business Analytics", url: "/dashboard/analytics" }],
  },
  {
    title: "Store Settings",
    url: "#",
    icon: Settings2,
    items: [{ title: "Store Appearance", url: "/dashboard/settings" }],
  },
];

export function AppSidebar({ ...props }) {
  const { user } = useUser();

  const navMain = useMemo(() => {
    if (user?.includesAi) return BASE_NAV;
    return BASE_NAV.filter((item) => item.title !== "AI Analytics");
  }, [user?.includesAi]);

  const teams = useMemo(
    () => [
      {
        name: user?.storeName || "My Store",
        logo: ShoppingBagIcon,
        plan: user?.planName || "Trial",
      },
    ],
    [user?.storeName, user?.planName]
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
