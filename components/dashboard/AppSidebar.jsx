"use client";

import * as React from "react";
import { Settings2, ShoppingBagIcon, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/dashboard/NavMain";
import { TeamSwitcher } from "@/components/dashboard/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  teams: [
    {
      name: "UddoktaHut",
      logo: ShoppingBagIcon,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Product Management",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Store Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Store Appearance",
          url: "/dashboard/settings",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
