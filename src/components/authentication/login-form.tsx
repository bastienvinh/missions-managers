'use client'

import { useActionState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { authenticate } from "@/app/(auth)/login/action"
import clsx from "clsx"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import _ from "lodash"
import { getConnectedUser } from "@/app/dal/user-dal"
import { redirect } from "next/navigation"
import { LogIn } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export default function LoginForm({ className }: { className?: string }) {
  const [actionState, userAction] = useActionState(authenticate, { success: false })

  useEffect(() => {
    getConnectedUser().then((user) => {
      if (user) {
        redirect('/')
      }
    })
  }, [])

  useEffect(() => {
    if (actionState?.success) {
      toast.success('Connection Success')
    } else if (!actionState?.success && !_.isEmpty(actionState?.message)) {
      toast.error(actionState?.message)
    }
  }, [actionState])

  return <form className={className} action={userAction}>
     <Card>
        <CardHeader>
          <CardTitle> Please Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email ..."
              className={clsx({ 'focus-visible:ring-red-500': actionState?.errors?.email, 'border-red-500': actionState?.errors?.email })}
            />
            {actionState?.errors?.email && <p className="text-red-500 text-sm">{actionState.errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className={clsx({ 'focus-visible:ring-red-500': actionState?.errors?.password,'border-red-500': actionState?.errors?.password })}
            />
            {actionState?.errors?.password && <p className="text-red-500 text-sm">{actionState.errors.password}</p>}
          </div>

        </CardContent>
        <CardFooter>
          <div className="w-full">
            <ConnectButton />
          </div>
        </CardFooter>
      </Card>
  </form>
}

function ConnectButton() {
  const {pending} = useFormStatus()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="w-full" type="submit" disabled={pending} variant="outline"><LogIn />Sign In</Button>  
      </TooltipTrigger>
      <TooltipContent>
        <div>To connect to the application</div>
      </TooltipContent>
    </Tooltip>
  )
}