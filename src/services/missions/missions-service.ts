import * as missionsRepositories from '@/db/repositories/missions-repositories'
import { MissionAddUpdateModel } from '@/db/schema/missions'
import { MissionFilter } from './type'

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

export async function getMissionsService(options?: { page?: number, limit?: number, term?: string, filter?: MissionFilter }) {
  return missionsRepositories.getMissionsDao(options)
}

export async function getExpiredMisisonsService() {
  return missionsRepositories.getExpiredMissionsDao()
}

export async function getExpiredTodayMissionService() {
  return missionsRepositories.getExpiredMissionTodayDao()
}

export async function destroyMissionsService(ids: string[]) {
  return missionsRepositories.destroyMissionsDao(ids)
}

export async function destroyExpiredMissionsService() {
  await missionsRepositories.truncateExpiredDao()
}

export async function getCompaniesService() {
  return missionsRepositories.getCompaniesDao()
}