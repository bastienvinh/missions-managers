'use server'

import React from "react"
import MissionPageMenu from "./components/MissionPageMenu"

export default async function Layout({ children } : { children: React.ReactNode }) {
  return (
    <div className="w-full h-full grid gap-2 overflow-hidden" style={{ gridTemplateRows: "auto 1fr" }}>
      <MissionPageMenu />
      <div className="grow overflow-y-auto">
        {children}
      </div>
    </div>
  )
}