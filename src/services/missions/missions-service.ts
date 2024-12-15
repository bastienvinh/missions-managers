import * as missionsRepositories from '@/db/repositories/missions-repositories'
import { MissionAddUpdateModel } from '@/db/schema/missions'

export function getSourcesService() {
  return missionsRepositories.getSourcesDao()
}

export function getTechnologiesService() {
  return missionsRepositories.getTechnologiesDao()
}

export function getTechnologiesByNameService(term: string) {
  return missionsRepositories.getTechnologiesByNameDao(term)
}

export async function createorUpdateMission(mission: MissionAddUpdateModel) {
  await missionsRepositories.createorUpdateMissionDao(mission)
}

export async function getMissionsService(options?: { page?: number, limit?: number, term?: string }) {
  return missionsRepositories.getMissionsDao(options)
}