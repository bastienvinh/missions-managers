'use server'

import { logger } from "@/lib/logger"
import { signUp } from "@/services/authentication/auth-service"
import { RoleEnum } from "@/services/authentication/type"
import { SignupFormSchema } from "@/services/validation/admin/register-form"
import { isRedirectError } from "next/dist/client/components/redirect"

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
  formData: FormData
) : Promise<FormState> {
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

  logger.info('Tentative to register an user')

  if (!parsedFields.success) {
    logger.error(`failed to register and user, invalid field: ${{email, name, password, confirmPassword, role}}`)
    return {
      success: false,
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields'
    }
  }

  try {
    await signUp(email, password, name, role)
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    logger.error('Register Error : ', error)
    return { success: false, message: `Something went wrong. ${error}`}
    // throw error
  }

  return { success: true, message: 'Success' }
}

export async function updateUser(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {

  return { success: false }
}