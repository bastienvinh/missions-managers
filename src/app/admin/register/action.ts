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

  if (!parsedFields.success) {
    return {
      success: false,
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields'
    }
  }

  return { success: true, message: 'User modified' }
}