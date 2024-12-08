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

// export async function register(
//   _currentState: FormState,
//   formData: FormData
// ) : Promise<FormState> {

// }