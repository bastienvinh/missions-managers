'use server'

import { sql, inArray, eq, or, like } from "drizzle-orm"
import db from "../schema"
import { MissionAddUpdateModel, missions, missionsHasTechnologies, technologies, TechnologyModel } from "../schema/missions"
import _ from "lodash"

import { v4 as uuid } from 'uuid'
import { MissionFilter } from "@/services/missions/type"

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
        throw new Error('Transaction Error')
      }
    })
  }
  catch (error) {
    throw new Error('impossible to insert into database, transaction failed')
  }
}

export async function getMissionsDao(options?: { page?: number, limit?: number, term?: string, filter?: MissionFilter }) {

  const query = db
    .select({
      ..._.omit(missions, 'getSQL', '$inferInsert', '$inferSelect', '_', 'shouldOmitSQLParens', 'enableRLS'),
      technologies: sql<string[]>`COALESCE(array_agg("name") FILTER (WHERE "name" IS NOT NULL), ARRAY[]::text[])`
    })
    .from(missions)
    .leftJoin(missionsHasTechnologies, eq(missions.id, missionsHasTechnologies.missionId))
    .leftJoin(technologies, eq(missionsHasTechnologies.technologyId, technologies.id))
    .groupBy(missions.id).$dynamic()

  if (options?.filter?.companies?.length) {
    query.where(inArray(missions.company, options.filter.companies))
  }

  if (options?.page && options.limit) {
    const offset = (options.page - 1) * options.limit
    query.offset(offset)
    query.limit(options.limit)
  } else if (options?.limit) {
    query.limit(options.limit)
  }

  if (options?.term?.trim().length) {
    query.where(or(
      like(missions.title, `%${options.term}%`),
      like(missions.description, `%${options.term}%`),
      like(missions.company, `%${options.term}%`),
      like(missions.sourceUrl, `%${options.term}%`)
      // TODO: add more criteria
    ))
  }

  return query.execute()
}

export async function destroyMissionsDao(ids: string[]) {
  try {
    db.transaction(async tx => {
      try {
        await tx.delete(missionsHasTechnologies).where(inArray(missionsHasTechnologies.missionId, ids))
        await tx.delete(missions).where(inArray(missions.id, ids))
      } catch (error) {
        tx.rollback()
        throw error
      }
    })
  } catch {
    throw new Error('impossible to delete into database, transaction failed')
  }
}

export async function getCompaniesDao() {
  return db.selectDistinct({ company: missions.company })
    .from(missions)
    .orderBy(missions.company)
    .then(res => res.filter(row => row.company !== null).map<string>(row => row.company ?? ''))
}