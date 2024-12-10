'use client'

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MissionPageMenu() {
  const pathname = usePathname()

  return (
    <div className="w-full p-5 pb-2">
      <div className="flex gap-7">
        <Link className={clsx("px-2 py-1 rounded hover:bg-slate-300 hover:text-black", { 'bg-slate-500': pathname === '/missions' })} href="/missions">Dashboard</Link>
        <Link className={clsx("px-2 py-1 rounded hover:bg-slate-300 hover:text-black", { 'bg-slate-500': pathname === '/missions/list' })} href="/missions/list">List</Link>
        <Link className={clsx("px-2 py-1 rounded hover:bg-slate-300 hover:text-black", { 'bg-slate-500': pathname === '/missions/form' })} href="/missions/form">New</Link>
      </div>
    </div>
  )
}