'use client'

import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { logout } from "./(auth)/login/action"
import { getConnectedUser } from "./dal/user-dal"

function Home() {

  useEffect(() => {
    getConnectedUser().then((user) => {
      // user not connected
      if (!user) {
        redirect('/login')
      } 
    })
  }, [])

  return (
    <>
      <h1>Welcome to Missions Manager</h1>
      <LogoutButton />
    </>
  )
}

function LogoutButton() {
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    setPending(true)
    await logout()
    setPending(false)
    redirect('/login')
  }

  return (
    <Button onClick={handleClick} disabled={pending}>
      Logout
    </Button>
  )
}

export default Home
