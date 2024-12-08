'use server'

import { logger } from "@/lib/logger"
import { SignupFormSchema } from "@/services/validation/admin/register-form"

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
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')
  const name = formData.get('name')
  const role = formData.get('role')

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

  return { success: true, message: 'Success' }
}