import { MissionAddModel, MissionModel, TechnologyAddModel, TechnologyModel } from "@/db/schema/missions"

export type Technology = TechnologyModel
export type AddTechnology = TechnologyAddModel


export type Mission = MissionModel
export type AddMission = MissionAddModel
export type UpdateMission = AddMission & { technologies: string[] }