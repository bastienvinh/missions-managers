'use client'

import { register as registerFormAction, updateUser } from "@/app/(back)/admin/register/action"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RoleEnum } from "@/services/authentication/type"
import { Label } from "@radix-ui/react-label"
import clsx from "clsx"
import { useActionState, useEffect, useTransition } from "react"
import { Alert, AlertDescription } from "../ui/alert"
import _ from  'lodash'
import { UserDTO } from "@/app/dal/user-dal"
import { useFormStatus } from "react-dom"
import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import {toast} from 'sonner'

import { SignupFormSchema, SignupFormSchemaType, UpdateUserFormSchema } from "@/services/validation/admin/register-form"


export default function RegisterForm({ className, user }: { className: string, user?: UserDTO }) {
  const [actionState, registerAction] = useActionState(user ? updateUser : registerFormAction, { success: false })

  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormSchemaType>({
    resolver: zodResolver(user ? UpdateUserFormSchema : SignupFormSchema),
    defaultValues: {
      id: user?.id,
      confirmPassword: '',
      password: '',
      email: user?.email ?? '',
      name: user?.name ?? '',
      role: (user?.role ?? RoleEnum.GUEST) as RoleEnum
    }
  })

  useEffect(() => {
    if (!isPending && actionState?.success) {
      toast.success(user ? 'Success Modified User' : 'Succes Added User')
      if (!user) reset()
    }
  }, [isPending, actionState, reset, user])


  function onSubmitHandler(data: SignupFormSchemaType) {
    const formData = new FormData()
    if (data.id) formData.set('id', data.id)
    formData.set('password', data.password)
    formData.set('confirmPassword', data.confirmPassword)
    formData.set('email', data.email)
    formData.set('name', data.name)
    formData.set('role', data.role)

    startTransition(() => registerAction(formData))
  }

  function onResetHandler() {
    startTransition(() => registerAction(null))
    // TODO: Manage the isPending when the transition is not finished
    reset()
  }

  return (
    <form className={className} onSubmit={handleSubmit(onSubmitHandler)}>
      {user && <input type="hidden" name="id" value={user.id} />}
      <Card>
        <CardHeader>
          <CardTitle>{user ? 'Modify' : 'Register' } an user</CardTitle>
          <CardDescription>{user ? 'Can modify a new user' : 'Can add a new user'}</CardDescription>
        </CardHeader>
        <CardContent>
            {(!actionState?.success && !_.isEmpty(actionState?.message)) && (
              <Alert className="mb-4 h-3 flex justify-center items-center" variant="destructive">
                <AlertDescription className="flex justify-center items-center">Registration Failed: {actionState?.message} - Please try again</AlertDescription>
              </Alert>
            )}
          <div className="space-y-2 mb-3">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register('name', { required: true })}
              defaultValue={user?.name ?? ''}
              className={clsx({ 'focus-visible:ring-red-500': actionState?.errors?.name || errors.name, 'border-red-500': actionState?.errors?.name || errors.name  })}
            />
            {actionState?.errors?.name && <p className="text-red-500 text-sm">{actionState.errors.name}</p>}
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2 mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
              { ...register('email', { required: true }) }
              type="email"
              defaultValue={user?.email ?? ''}
              className={clsx({ 'focus-visible:ring-red-500': actionState?.errors?.email || errors.email, 'border-red-500': actionState?.errors?.email || errors.email })}
            />
            {actionState?.errors?.email && <p className="text-red-500 text-sm">{actionState.errors.email}</p>}
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2 mb-3">
            <Label htmlFor="password">Password</Label>
            <Input
              {  ...register('password', { required: !user }) }
              type="password"
              className={clsx({ 'focus-visible:ring-red-500': actionState?.errors?.password || errors.password,'border-red-500': actionState?.errors?.password || errors.password })}
            />
            {actionState?.errors?.password && <p className="text-red-500 text-sm">{actionState.errors.password}</p>}
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="space-y-2 mb-3">
            <Label htmlFor="verifyPassword">Verify Password</Label>
            <Input
              {  ...register('confirmPassword', { required: !user }) }
              type="password"
              className={clsx({ 'focus-visible:ring-red-500': actionState?.errors?.confirmPassword || errors.confirmPassword, 'border-red-500': actionState?.errors?.confirmPassword || errors.confirmPassword })}
            />
            {actionState?.errors?.confirmPassword && <p className="text-red-500 text-sm">{actionState.errors.confirmPassword}</p>}
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select { ...register('role', { required: true }) } defaultValue={user?.role ?? RoleEnum.ADMIN}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={RoleEnum.ADMIN}>Administrator</SelectItem>
                  <SelectItem value={RoleEnum.GUEST}>Guest</SelectItem>
                  <SelectItem value={RoleEnum.REDACTOR}>Redactor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between">
            <div>
              {user ? <Button type="button" variant="destructive">Delete Forever</Button> : null}
            </div>
            <div className="justify-self-end flex gap-3">
              <Button variant="secondary" type="button" onClick={onResetHandler}>Reset</Button>
              <AddUpdateButton hasUser={!!user} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}

function AddUpdateButton({ hasUser }: { hasUser: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} variant="outline">{hasUser ? 'Modify' : 'Add'}</Button>
  )
}