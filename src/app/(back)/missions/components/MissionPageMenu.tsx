'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect, usePathname } from "next/navigation"
import React from "react"

export default function MissionPageMenu() {
  const pathname = usePathname()

  function handleNavigate(path: string) {
    redirect(path)
  }

  return (
    <div className="w-full p-5 pb-2">
      <Tabs className="w-fit" value={pathname}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger onClick={() => handleNavigate('/missions')} value="/missions">Dashboard</TabsTrigger>
          <TabsTrigger onClick={() => handleNavigate('/missions/list')} value="/missions/list">List</TabsTrigger>
          <TabsTrigger onClick={() => handleNavigate('/missions/form')} value="/missions/form">Create Position</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}