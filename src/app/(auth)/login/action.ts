'use server'

import { logger } from "@/lib/logger"
import { signIn, signOut } from "@/services/authentication/auth"
import { SignInError } from "@/services/authentication/type"
import { LoginFormSchema } from "@/services/validation/ui/login-form"
import { AuthError } from "next-auth"
import { isRedirectError } from "next/dist/client/components/redirect"

export type FormState = {
  success: boolean
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string
} | undefined

export async function authenticate(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {
  logger.info('authenticate ...')

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const parsedFields = LoginFormSchema.safeParse({
    email,
    password,
  })

  if (!parsedFields.success) {
    return {
      success: false,
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.',
    }
  }

  try {
    const user = await signIn('credentials', formData)
    logger.info('Signin : ', user)
  } catch (error) {
    if (isRedirectError(error)) {
      console.error('worowsdsnadsjdns')
      throw error
    }
    const signInError = error as SignInError
    if (error instanceof AuthError) {
      return { success: false, message: `Authentication error.${error.cause?.err}`}
    }
    if (error) {
      switch (signInError.type) {
        case 'CredentialsSignin': {
          return { success: false, message: 'Invalid credentials.'}
        }
        default: {
          return {
            success: false,
            message: `Something went wrong.${signInError.message}`,
          }
        }
      }
    }

    return {
      success: false,
      message: Reflect.get(error as Error, 'message')
    }
  }

  return { success: true, message: 'Success user connected' }
}

export async function logout() {
  await signOut({ redirect: true, redirectTo: '/login' })
}