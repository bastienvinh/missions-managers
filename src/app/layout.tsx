import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import Menu from "./menu"


export const metadata: Metadata = {
  title: "Mission Manager",
  description: "Manage your Freelance missions here, simple and efficient ...",
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen grid overflow-hidden grid-rows-[1fr] grid-cols-[auto_1fr]">
        <TooltipProvider>
          <Menu />
          <div className="overflow-hidden">
            {children}
          </div>
          <Toaster richColors />
        </TooltipProvider>
      </body>
    </html>
  )
}
