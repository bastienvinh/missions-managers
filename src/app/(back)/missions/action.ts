'use server'

import { MissionFormSchema, MissionSchemaType } from "@/services/validation/ui/mission-form"

export type FormState = {
  init?: boolean
  success: boolean
  errors?: {
    title?: string[],
    company?: string[],
    expirationDate?: string[],
    salary?: string[],
    description?: string[],
    
    // Job details
    type?: string[],
    analytics?: string[],
    url?: string[],
    
    // Rating and categorization
    level?: string[],
    source?: string[],
    technologies?: string[]
  }
  message?: string
} | undefined

export async function addUpdateMission(
  _previousState: FormState,
  formData: MissionSchemaType
) : Promise<FormState> {
  
  const parsedFields = MissionFormSchema.safeParse(formData)

  if (!parsedFields.success) {
    console.log(parsedFields.error)
    return {
      success: false,
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.',
    }
  }

  return { success: true, message: 'success' }
}