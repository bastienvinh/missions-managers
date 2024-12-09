import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import Menu from "./menu"
import { getConnectedUser } from "./dal/user-dal"


export const metadata: Metadata = {
  title: "Mission Manager",
  description: "Manage your Freelance missions here, simple and efficient ...",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const user = await getConnectedUser()

  return (
    <html>
      <body className="h-screen w-screen grid overflow-hidden" style={{ gridTemplateColumns: user ? "auto 1fr" : "1fr", gridTemplateRows: "1fr" }}>
        <TooltipProvider>
          {user && <Menu user={user} />}
          <div className="overflow-hidden">
            {children}
          </div>
          <Toaster richColors />
        </TooltipProvider>
      </body>
    </html>
  )
}
