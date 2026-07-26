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
import { GalleryVerticalEndIcon, TerminalSquareIcon, BookOpenIcon, Trash, LogOut } from "lucide-react"
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
      url: "/",
      icon: <TerminalSquareIcon />,
      isActive: true,
    },
    {
      title: "Archived",
      url: "/archived",
      icon: <Trash />,
    },
    {
      title: "How to use",
      url: "/guide",
      icon: <BookOpenIcon />,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const handleLogout = useLogout()
  return (
    <Sidebar className="" collapsible="icon" {...props}>
      <SidebarHeader className="px-3 py-4">
        <h3 className="text-xl font-semibold leading-none tracking-tight transition-all group-data-[collapsible=icon]:text-base">
          <span className="group-data-[collapsible=icon]:hidden">
            Habit Tracker
          </span>

          <span className="hidden group-data-[collapsible=icon]:inline">
            HT
          </span>
        </h3>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <button
          onClick={handleLogout}
          className=" cursor-pointer
      group flex w-full items-center rounded-lg
      border bg-gray-600 px-3 py-2
      text-destructive/90 transition-all
      hover:bg-gray-500 active:scale-95
    "
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className="ml-2 font-semibold group-data-[collapsible=icon]:hidden">
            Log out
          </span>
        </button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
