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
import { GalleryVerticalEndIcon, TerminalSquareIcon, BookOpenIcon, Trash } from "lucide-react"
import { useLogout } from "@/hooks/use-logout"

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
      title: "Archived",
      url: "#",
      icon: (
        <Trash
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
  const handleLogout = useLogout()
  return (
    <Sidebar className="" collapsible="icon" {...props}>
      <SidebarHeader>
        <h3 className="text-lg font-semibold leading-none tracking-tight mt-4 ml-3">Habit Tracker</h3>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <button  onClick={handleLogout} className="text-destructive rounded-full font-semibold border py-1 w-2/3 mx-auto bg-gray-600 cursor-pointer active:scale-95">Log out</button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
