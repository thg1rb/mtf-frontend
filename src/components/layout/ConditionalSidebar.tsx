"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import AgentSidebar from "@/components/layout/AgentSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import AdminSidebar from "./AdminSidebar"

export function ConditionalSidebar({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: role check (admin or agent)
  const isAdmin = false;
  const pathname = usePathname()

  if (pathname === "/") {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      {isAdmin ? <AdminSidebar /> : <AgentSidebar />}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
