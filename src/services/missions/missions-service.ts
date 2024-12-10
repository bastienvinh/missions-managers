import * as missionsRepositories from '@/db/repositories/missions-repositories'

export function getSourcesService() {
  return missionsRepositories.getSourcesDao()
}

export function getTechnologiesService() {
  return missionsRepositories.getTechnologiesDao()
}