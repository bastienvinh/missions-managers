import { getMissionsService } from "@/services/missions/missions-service"
import { Mission } from "@/types/missions-types"
import _ from "lodash"


export type MissionDal = Omit<Mission, 'technologies'> & {
  technologies: string[]
}

export async function getMissionsDal(options?: { page?: number, limit?: number, term?: string }): Promise<MissionDal[]> {

  // we gonna to transform to be usesable

  const data = await getMissionsService(options)
  
  const transformData: MissionDal[] = data.map(row => {
    const newRow = _.omit(row, 'technologies')
    return {
      ...newRow,
      technologies: row.technologies.map(relationModel => relationModel.technology.name)
    } as MissionDal
  })
  
  return transformData
}