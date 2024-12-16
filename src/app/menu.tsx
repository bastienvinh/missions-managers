'use server'

import { getConnectedUser } from "./dal/user-dal"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider } from "@/components/ui/sidebar"
import SideBarFooterNavigation from "@/components/sidebar-footer-navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChartNoAxesCombined, ChevronRight, ClipboardList, House, LayoutDashboard, SquarePlus, StickyNote, Users } from "lucide-react"
import Link from "next/link"
import { hasRequiredRole } from "./dal/user-dal.utils"
import { RoleEnum } from "@/services/authentication/type"

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
            <SidebarMenuItem>
              <Link href="/">
                <span className="flex gap-1 items-center"><House />Home</span>
              </Link>
            </SidebarMenuItem>
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
                      <div className="flex gap-1 items-center">
                        <StickyNote />
                        <span>Missions</span>
                      </div>
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
                            <span className="flex gap-1 items-center"><LayoutDashboard />Dashboard</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/missions/list">
                            <span className="flex gap-1 items-center"><ClipboardList />List</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      {/* new missions */}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/missions/form">
                            <span className="flex gap-1 items-center"><SquarePlus />New Mission</span>
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
                  <Link href="/stats">
                    <span className="flex gap-1 items-center"><ChartNoAxesCombined />Statistics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarMenu>
          </SidebarGroup>


          {/* Settings */}
          {hasRequiredRole(user, RoleEnum.ADMIN) && <SidebarGroup>
            <SidebarGroupLabel>Manage</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenu>
                <SidebarMenuButton>
                  <Link href="/users">
                    <span className="flex gap-1 items-center"><Users />Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarMenu>
          </SidebarGroup>}
          

        </SidebarContent>
        <SidebarFooter>
          <SideBarFooterNavigation user={user} />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
