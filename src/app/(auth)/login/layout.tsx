import React from "react";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark dark:bg-black h-screen w-screen">
      {children}
      <Toaster richColors />
    </div>
  )
}