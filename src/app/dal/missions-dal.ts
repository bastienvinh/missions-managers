import { getMissionsService } from "@/services/missions/missions-service"
import { MissionFilter } from "@/services/missions/type"
import { Mission } from "@/types/missions-types"
import _ from "lodash"


export type MissionDal = Omit<Mission, 'technologies'> & {
  technologies: string[]
}

export async function getMissionsDal(options?: { page?: number, limit?: number, term?: string, filter?: MissionFilter }): Promise<{result: MissionDal[], total: number}> {
  return getMissionsService(options)
}