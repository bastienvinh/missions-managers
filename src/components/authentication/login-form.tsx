'use client'

import { FormEvent, useActionState, useEffect, useTransition } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { authenticate } from "@/app/(auth)/login/action"
import clsx from "clsx"
import _ from "lodash"
import { LogIn } from "lucide-react"
import { toast } from "sonner"

export default function LoginForm({ className }: { className?: string }) {
  const [actionState, userAction] = useActionState(authenticate, { success: false, init: true })
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    startTransition(() => userAction(new FormData(form)))
  }

  useEffect(() => {
    // FIXME: fix the toaster
    if (!isPending && !actionState?.init && !actionState?.success) {
      toast.error(actionState?.message)
    }
  }, [isPending, actionState])

  return <form className={className} onSubmit={handleSubmit}>
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
            <Button disabled={isPending} className="w-full" type="submit" variant="outline"><LogIn />Sign In</Button>  
          </div>
        </CardFooter>
      </Card>
  </form>
}