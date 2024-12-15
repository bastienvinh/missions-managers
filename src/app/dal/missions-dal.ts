import { getMissionsService } from "@/services/missions/missions-service"
import { Mission } from "@/types/missions-types"


export type MissionDal = Mission

export function getMissionsDal(): Promise<MissionDal[]> {
  return getMissionsService()
}