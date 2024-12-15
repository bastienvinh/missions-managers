'use server'

import { getConnectedUser } from "./dal/user-dal"
import { Sidebar, SidebarFooter, SidebarProvider } from "@/components/ui/sidebar"
import SideBarFooterNavigation from "@/components/sidebar-footer-navigation"

export default async function Menu() {

  const user = await getConnectedUser()

  if (!user) {
    return null
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarFooter>
          <SideBarFooterNavigation user={user} />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
    // <div className="w
    // -full h-full flex flex-col justify-between bg-slate-800">
    //   <div className="w-full p-5">
    //     <nav>
    //       <ul role="list" className="w-full text-white flex flex-col gap-10">
    //         <li className="w-full">
    //           <ul className="w-full flex flex-col gap-2">
    //             <li className="w-full hover:bg-gray-500 rounded p-3 text-xl"><Link href="/" className="flex justify-between"><span className="flex gap-2"><House />Home</span></Link></li>
    //             <li className="w-full hover:bg-gray-500 rounded p-3 text-xl"><Link href="/missions" className="flex justify-between"><span className="flex gap-2"><Newspaper />Missions</span></Link></li>
    //             <li className="w-full hover:bg-gray-500 rounded p-3 text-xl"><Link href="/stats" className="flex justify-between"><span className="flex gap-2"><ChartLine />Stats</span></Link></li>
    //           </ul>
    //         </li>
    //         <li className="flex flex-col gap-5">
    //           <div className="ps-2">Settings</div>
    //           <ul className="w-full flex flex-col gap-2">
    //             {hasRequiredRole(user as User, RoleEnum.ADMIN) && <li className="w-full hover:bg-gray-500 rounded p-3 text-xl"><Link href="/users" className="flex justify-between"><span className="flex gap-2"><Users />Users</span></Link></li>}
    //             <li className="w-full hover:bg-gray-500 rounded p-3 text-xl"><Link href="/parameters" className="flex justify-between"><span className="flex gap-2"><SlidersHorizontal />Parameters</span></Link></li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>

    //   <div className="bg-slate-900 p-4 flex gap-2 justify-between">
    //     <div className="flex gap-2 items-center">
    //       <Avatar>
    //         {/* Im lazy to find an image ... */}
    //         <AvatarImage src="/persona-01.png" alt="@shadcn" />
    //         <AvatarFallback>U</AvatarFallback>
    //       </Avatar>
    //       {user?.name}
    //     </div>
    //     <Tooltip>
    //       <TooltipContent>Logout</TooltipContent>
    //     </Tooltip>
    //   </div>
    // </div>
  )
}
