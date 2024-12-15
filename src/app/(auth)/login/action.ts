'use server'

import { signIn, signOut } from "@/services/authentication/auth"
import { SignInError } from "@/services/authentication/type"
import { LoginFormSchema } from "@/services/validation/ui/login-form"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export type FormState = {
  success: boolean
  init?: boolean
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
    console.log(user)
  } catch (error) {
    const signInError = error as SignInError

    if (error instanceof AuthError) {
      return { success: false, message: `Authentication error.${error.message}`}
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

    // return {
    //   success: false,
    //   message: Reflect.get(error as Error, 'message')
    // }
    throw error
  } finally {
    redirect('/')
  }

  return { success: true, message: 'Success user connected' }
}

export async function logout() {
  await signOut({ redirect: true, redirectTo: '/login' })
}