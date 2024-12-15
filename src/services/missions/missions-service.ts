import * as missionsRepositories from '@/db/repositories/missions-repositories'
import { MissionAddUpdateModel } from '@/db/schema/missions'

export function getSourcesService() {
  return missionsRepositories.getSourcesDao()
}

export function getTechnologiesService() {
  return missionsRepositories.getTechnologiesDao()
}

export async function createorUpdateMission(mission: MissionAddUpdateModel) {
  await missionsRepositories.createorUpdateMissionDao(mission)
}

export async function getMissionsService() {
  return missionsRepositories.getMissionsDao()
}