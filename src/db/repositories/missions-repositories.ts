'use server'

import { sql } from "drizzle-orm"
import db from "../schema"
import { MissionAddUpdateModel, missions, missionsHasTechnologies, technologies } from "../schema/missions"

export async function getSourcesDao() {
  return db.query.sources.findMany()
}

export async function getTechnologiesDao() {
  return db.query.technologies.findMany()
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
        const [model] = await tx.insert(missions).values([mission]).returning()

        const existedTechnologies = mission.technologies?.length ? await tx.execute(sql`SELECT json_agg(LOWER("name")) as "result" FROM "technology" WHERE "name" IN (${sql.join(mission.technologies ?? [], sql`, `)})`) : []
        const newTechnologies = mission.technologies?.filter(t => !existedTechnologies.find(et => et.name === t.toLocaleLowerCase()))
        
        // associated technologies to mission
        
        if (newTechnologies?.length) {
          const technosInserted = await tx.insert(technologies).values(newTechnologies?.map(techno => ({ name: techno })) ?? []).returning()
          await tx.insert(missionsHasTechnologies).values(technosInserted.map(techno => ({ missionId: model.id, technologyId: techno.id })))
        }
      }
      catch (error) {
        tx.rollback()
        throw new Error('Transaction Error')
      }
    })
  }
  catch (error) {
    throw new Error('impossible to insert into database, transaction failed')
  }
}