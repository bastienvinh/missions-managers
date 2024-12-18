import { getMissionService, getMissionsService } from "@/services/missions/missions-service"
import { MissionFilter } from "@/services/missions/type"
import { Mission } from "@/types/missions-types"
import _ from "lodash"


export type MissionDTO = Omit<Mission, 'technologies'> & {
  technologies: string[]
}

export async function getMissionsDal(options?: { page?: number, limit?: number, term?: string, filter?: MissionFilter }): Promise<{result: MissionDTO[], total: number}> {
  return getMissionsService(options)
}

export async function getMissionDal(id: string) {
  return getMissionService(id)
}