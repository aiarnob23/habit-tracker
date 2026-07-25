"use client"
import * as React from "react"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, TerminalSquareIcon, BotIcon, BookOpenIcon } from "lucide-react"
import { Button } from "./ui/button"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    }
  ],
  navMain: [
    {
      title: "Habits",
      url: "#",
      icon: (
        <TerminalSquareIcon
        />
      ),
      isActive: true,
    },
    {
      title: "Profile",
      url: "#",
      icon: (
        <BotIcon
        />
      ),
    },
    {
      title: "How to use",
      url: "#",
      icon: (
        <BookOpenIcon
        />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="" collapsible="icon" {...props}>
      <SidebarHeader>
        <h3 className="text-lg font-semibold leading-none tracking-tight mt-4 ml-3">Habit Tracker</h3>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button variant="destructive">Log out</Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
