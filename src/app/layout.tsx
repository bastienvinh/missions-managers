import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"


export const metadata: Metadata = {
  title: "Mission Manager",
  description: "Manage your Freelance missions here, simple and efficient ...",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className="h-screen w-screen">
        <TooltipProvider>
          {children}
          <Toaster richColors />
        </TooltipProvider>
      </body>
    </html>
  )
}
