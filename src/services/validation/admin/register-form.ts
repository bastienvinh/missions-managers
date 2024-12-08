import { RoleEnum } from "@/services/authentication/type"
import { z } from "zod"

export const SignupFormSchema = z
  .object({
    email: z.string().email({message: 'Please enter a valid email.'}).trim(),
    name: z.string().min(4, {message: 'Be at least 4 characters long'}),
    password: z
      .string()
      .min(4, {message: 'Be at least 4 characters long'})
      .regex(/[A-Za-z]/, {message: 'Contain at least one letter.'})
      .regex(/\d/, {message: 'Contain at least one number.'})
      .trim(),
    confirmPassword: z.string(),
    role: z.nativeEnum(RoleEnum).default(RoleEnum.GUEST)
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    }
  )