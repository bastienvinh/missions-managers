

import { getConnectedUser } from "@/app/dal/user-dal"
import LoginForm from "@/components/authentication/login-form"
import { redirect } from "next/navigation"
import { Github }from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const user = await getConnectedUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex justify-center w-full h-full items-center">
      <LoginForm className="w-1/4" />
      <div className="fixed bottom-10 right-10 p-6 rounded-full bg-gray-800 border-0">
        <a href="https://github.com/bastienvinh">
          <Github />
        </a>
      </div>
    </div>
  )
}