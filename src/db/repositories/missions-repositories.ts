'use server'

import { sql } from "drizzle-orm"
import db from "../schema"
import { MissionAddUpdateModel, missions, missionsHasTechnologies, technologies, TechnologyModel } from "../schema/missions"
import _ from "lodash"

import { v4 as uuid } from 'uuid'

export async function getSourcesDao() {
  return db.query.sources.findMany()
}

export async function getTechnologiesDao() {
  return db.query.technologies.findMany()
}

export async function getTechnologiesByNameDao(term: string): Promise<string[]> {
  return db.query.technologies.findMany({
    columns: {
      name: true
    },
    where: (technos, { like }) => like(technos.name, `%${term}%`) 
  }).then(res => res.map(row => row.name))
}

export async function getTechnologiesByListDao(list: string[]) {
  const result = await db.execute(sql`SELECT json_agg(LOWER("name")) as "result" FROM "technology" WHERE "name" IN (${sql.join(list, sql`, `)})`)
  return result[0].result ?? [] as string[]
}

export async function createorUpdateMissionDao(mission: MissionAddUpdateModel) {
  try {
    await db.transaction(async (tx) => {
      try {
        // We create new technologies they don't exists
        const [model] = await tx.insert(missions).values([{ ..._.omit(mission, 'technologies', 'id'), id: mission.id ?? uuid() }]).returning()

        const existedTechnologies: TechnologyModel[] = mission.technologies?.length ? await tx.execute(sql`SELECT "id", "name" FROM "technology" WHERE "name" IN (${sql.join(mission.technologies, sql`, `)})`) : []
        const newTechnologies = mission.technologies?.filter(t => !existedTechnologies.find(et => et.name.toLocaleLowerCase() === t.toLocaleLowerCase()))

        // associated technologies to mission

        if (newTechnologies?.length || existedTechnologies?.length) {
          const technosInserted = newTechnologies?.length ? await tx.insert(technologies).values(newTechnologies?.map(techno => ({ name: techno })) ?? []).returning() : []
          await tx.insert(missionsHasTechnologies).values([ ...existedTechnologies, ...technosInserted].map(techno => ({ missionId: model.id, technologyId: techno.id })))
        }

      }
      catch (error) {
        console.log(error)
        throw new Error('Transaction Error')
      }
    })
  }
  catch (error) {
    console.log(error)
    throw new Error('impossible to insert into database, transaction failed')
  }
}

export async function getMissionsDao() {
  return db.query.missions.findMany()
}