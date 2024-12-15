'use server'

import { logger } from "@/lib/logger"
import { modifyUser, signUp } from "@/services/authentication/auth-service"
import { RoleEnum } from "@/services/authentication/type"
import { SignupFormSchema, UpdateUserFormSchema } from "@/services/validation/admin/register-form"
// import { isRedirectError } from "next/dist/client/components/redirect"

export type FormState = {
  success: boolean
  errors?: {
    email?: string[]
    name?: string[]
    password?: string[]
    confirmPassword?: string[]
    role?: string[]
  }
  message?: string
} | undefined

export async function register(
  _currentState: FormState,
  formData: FormData | null
) : Promise<FormState> {

  if (formData === null) {
    return
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const name = formData.get('name') as string
  const role = formData.get('role') as RoleEnum

  const parsedFields = SignupFormSchema.safeParse({
    email,
    name,
    password,
    confirmPassword,
    role
  })

  if (!parsedFields.success) {
    logger.error(`failed to register and user, invalid field: ${JSON.stringify({email, name, password, confirmPassword, role})}`)
    return {
      success: false,
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields'
    }
  }

  try {
    await signUp(email, password, name, role)
  } catch (error) {
    return { success: false, message: `Something went wrong. ${error}`}
  }

  return { success: true, message: 'Success' }
}

export async function updateUser(
  _currentState: FormState,
  formData: FormData | null
): Promise<FormState> {

  if (formData === null) {
    return
  }

  const id = formData.get('id') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const name = formData.get('name') as string
  const role = formData.get('role') as RoleEnum

  const parsedFields = UpdateUserFormSchema.safeParse({
    email,
    name,
    password,
    confirmPassword,
    role
  })

  logger.info('Tentative to modify an user')

  if (!parsedFields.success) {
    logger.error(`failed to modify and user, invalid field: ${JSON.stringify({email, name, password, confirmPassword, role})}`)
    return {
      success: false,
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields'
    }
  }

  try {
    await modifyUser(id, email, password, name, role)
  } catch (error) {
    return { success: false, message: `Error: ${error}` }
  }

  return { success: true, message: 'Successfull' }
}