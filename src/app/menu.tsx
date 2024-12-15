'use server'

import { getConnectedUser } from "./dal/user-dal"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider } from "@/components/ui/sidebar"
import SideBarFooterNavigation from "@/components/sidebar-footer-navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight, StickyNote } from "lucide-react"
import Link from "next/link"

export default async function Menu() {

  const user = await getConnectedUser()

  if (!user) {
    return null
  }

  return (
    <SidebarProvider className="h-full">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem><Link href="/">Home</Link></SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>

          {/* Main Menu */}
          <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="mission">
                      <StickyNote />
                      <span>Missions</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {/* Sub menu missions */}

                      {/* Dashboard */}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/missions">
                          <span>Dashboard</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      {/* new missions */}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/missions/form">
                          <span>New Mission</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/missions/list">
                          <span>Lists</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>

          {/* Operations */}
          <SidebarGroup>
            <SidebarGroupLabel>Operations</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenu>
                <SidebarMenuButton>
                  <Link href="/stats">Statistics</Link>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarMenu>
          </SidebarGroup>

        </SidebarContent>
        <SidebarFooter>
          <SideBarFooterNavigation user={user} />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
