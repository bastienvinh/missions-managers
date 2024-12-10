import React from "react";
import MissionPageMenu from "./components/MissionPageMenu";

export default function Layout({ children } : { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <MissionPageMenu />
      <div className="grow">
        {children}
      </div>
    </div>
  )
}