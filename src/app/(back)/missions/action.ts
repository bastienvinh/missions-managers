'use server'

import { getConnectedUser } from "@/app/dal/user-dal"
import { logger } from "@/lib/logger"
import { createorUpdateMission } from "@/services/missions/missions-service"
import { MissionFormSchema, MissionSchemaType } from "@/services/validation/ui/mission-form"
import _ from "lodash"
import { isRedirectError } from "next/dist/client/components/redirect"

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

  logger.info('Tentative to create a mission/job data')

  if (!parsedFields.success) {
    return {
      success: false,
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.',
    }
  }

  try {
    const user = await getConnectedUser()
    
    if (!user) {
      logger.warning('Tentative to insert a job by outsider')
      throw new Error('Impossible to detect author')
    }
    
    const rawData = _.omit(parsedFields.data, 'url', 'source', 'level', 'expirationDate')
    await createorUpdateMission({ ...rawData, expirationDate: parsedFields.data.expirationDate ?? null, authorId: user?.id, likeLevel: parsedFields.data.level, sourceUrl: parsedFields.data.url, sourceId: parsedFields.data.source })
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    logger.error(`Database Mission Error : ${error}`)
    return { success: false, message: `Something went wrong. ${(error as Error).name}`}
  }
  logger.info(`success to create a job : ${parsedFields.data.title}`)
  
  return { success: true, message: 'success' }
}