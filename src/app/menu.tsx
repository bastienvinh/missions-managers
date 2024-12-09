'use client'

import { House, Newspaper, ChartLine, Users, LogOut, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { logout } from "./(auth)/login/action"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { isRedirectError } from "next/dist/client/components/redirect"
import { UserDTO } from "./dal/user-dal.utils"

export default function Menu({ user }: { user?: UserDTO }) {
  return (
    <div className="w-1/6 h-full flex flex-col justify-between bg-slate-800">
      <div className="w-full p-5 h-full">
        <nav>
          <ul role="list" className="w-full text-white flex flex-col gap-10">
            <li className="w-full">
              <ul className="w-full flex flex-col gap-2">
                <li className="w-full hover:bg-gray-500 rounded p-3 text-xl"><Link href="/" className="flex justify-between"><span className="flex gap-2"><House />Home</span></Link></li>
                <li className="w-full hover:bg-gray-500 rounded p-3 text-xl"><Link href="/missions" className="flex justify-between"><span className="flex gap-2"><Newspaper />Missions</span></Link></li>
                <li className="w-full hover:bg-gray-500 rounded p-3 text-xl"><Link href="/stats" className="flex justify-between"><span className="flex gap-2"><ChartLine />Stats</span></Link></li>
              </ul>
            </li>
            <li className="flex flex-col gap-5">
              <div className="ps-2">Settings</div>
              <ul className="w-full flex flex-col gap-2">
                <li className="w-full hover:bg-gray-500 rounded p-3 text-xl"><Link href="/users" className="flex justify-between"><span className="flex gap-2"><Users />Users</span></Link></li>
                <li className="w-full hover:bg-gray-500 rounded p-3 text-xl"><Link href="/parameters" className="flex justify-between"><span className="flex gap-2"><SlidersHorizontal />Parameters</span></Link></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <div className="bg-slate-900 p-4 flex justify-between">
        <div className="flex gap-2 items-center">
          <Avatar>
            {/* Im lazy to find an image ... */}
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          {user?.name}
        </div>
        <Tooltip>
          <LogoutButton />
          <TooltipContent>Logout</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

function LogoutButton() {
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    setPending(true)
    try {
      await logout()
    } catch (error) {
      if (isRedirectError(error)) {
        // Do nothing ...
      }
    }
    finally {
      setPending(false)
    }
  }

  return (
    <TooltipTrigger onClick={handleClick} disabled={pending} className="bg-slate-900 hover:bg-slate-800 rounded border-white border p-2 cursor-pointer">
      <LogOut />
    </TooltipTrigger>
  )
}