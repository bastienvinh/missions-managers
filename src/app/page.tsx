'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { logout } from "./(auth)/login/action"

function Home() {
  return (
    <>
      <h1>Welcome to Missions Manager</h1>
      <LogoutButton />
    </>
  )
}

function LogoutButton() {
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setPending(true)
    await logout()
    setPending(false)
    router.push('/login/')
  }

  return (
    <Button onClick={handleClick} disabled={pending}>
      Logout
    </Button>
  )
}

export default Home
