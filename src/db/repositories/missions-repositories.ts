'use server'

import { sql, inArray, eq, or, like, and, lt } from "drizzle-orm"
import db from "../schema"
import { MissionAddUpdateModel, missions, missionsHasTechnologies, technologies, TechnologyModel } from "../schema/missions"
import _ from "lodash"

import { v4 as uuid } from 'uuid'
import { MissionFilter } from "@/services/missions/type"
import { PgSelect } from "drizzle-orm/pg-core"
import dayjs from "dayjs"


interface GetMissionParameters {
  page?: number,
  limit?: number,term?: string,
  filter?: MissionFilter
}

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

export async function createOrUpdateMissionDao(mission: MissionAddUpdateModel) {
  try {
    await db.transaction(async (tx) => {
      try {
        console.log(mission.id)
        // We create new technologies they don't exists
        const [model] = await tx.insert(missions).values([{ ..._.omit(mission, 'technologies', 'id'), id: mission.id ?? uuid() }])
          .onConflictDoUpdate({ target: missions.id, set: { ..._.omit(mission, 'createdAt', 'updateAt') } })
          .returning()

        const existedTechnologies: TechnologyModel[] = mission.technologies?.length ? await tx.execute(sql`SELECT "id", "name" FROM "technology" WHERE "name" IN (${sql.join(mission.technologies, sql`, `)})`) : []
        const newTechnologies = mission.technologies?.filter(t => !existedTechnologies.find(et => et.name.toLocaleLowerCase() === t.toLocaleLowerCase()))

        // associated technologies to mission

        if (newTechnologies?.length || existedTechnologies?.length) {
          await tx.delete(missionsHasTechnologies).where(eq(missionsHasTechnologies.missionId, model.id))
          const technosInserted = newTechnologies?.length ? await tx.insert(technologies).values(newTechnologies?.map(techno => ({ name: techno })) ?? []).returning() : []
          await tx.insert(missionsHasTechnologies).values([ ...existedTechnologies, ...technosInserted].map(techno => ({ missionId: model.id, technologyId: techno.id })))
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

// #region Dynamic Queries

function withBaseFilterCriterias<T extends PgSelect>(query: T, options?: GetMissionParameters) {
  query
    .leftJoin(missionsHasTechnologies, eq(missions.id, missionsHasTechnologies.missionId))
    .leftJoin(technologies, eq(missionsHasTechnologies.technologyId, technologies.id))

  const args = []

  if (options?.filter?.companies?.length) {
    args.push(inArray(missions.company, options.filter.companies))
  }

  if (options?.filter?.technologies?.length) {
    args.push(inArray(technologies.id, options.filter.technologies))
  }

  if (options?.term?.trim().length) {
    args.push(or(
      like(missions.title, `%${options.term}%`),
      like(missions.description, `%${options.term}%`),
      like(missions.company, `%${options.term}%`),
      like(missions.sourceUrl, `%${options.term}%`)
      // TODO: add more criteria
    ))
  }

  if (args.length) {
    query.where(and(...args))
  }

  return query
}

function withPage<T extends PgSelect>(query: T, options?: GetMissionParameters) {
  if (options?.page && options.limit) {
    const offset = (options.page - 1) * options.limit
    query.offset(offset)
    query.limit(options.limit)
  } else if (options?.limit) {
    query.limit(options.limit)
  }

  return query
}

// #endregion

export async function getMissionsDao(options?: GetMissionParameters) {

  const countQuery = db.select({
    count: sql<number>`COUNT(DISTINCT mission."id")`
  })
  .from(missions).$dynamic()

  const finalCountQuery = withBaseFilterCriterias(countQuery, options)

  const query = db.select({
    ..._.omit(missions, 'getSQL', '$inferInsert', '$inferSelect', '_', 'shouldOmitSQLParens', 'enableRLS'),
    technologies: sql<string[]>`COALESCE(array_agg("name") FILTER (WHERE "name" IS NOT NULL), ARRAY[]::text[])`,
  }).from(missions).groupBy(missions.id).$dynamic()

  let finalQuery = withBaseFilterCriterias(query, options)
  finalQuery = withPage(finalQuery, options)

  // TODO: with created_at Improve the result

  const result = await finalQuery.execute()
  const total = await finalCountQuery.execute().then(res => res[0].count)

  return {
    result,
    total
  }
}


export async function getMissionDao(id: string) {
  return db.select({
    ..._.omit(missions, 'getSQL', '$inferInsert', '$inferSelect', '_', 'shouldOmitSQLParens', 'enableRLS'),
    technologies: sql<string[]>`COALESCE(array_agg("name") FILTER (WHERE "name" IS NOT NULL), ARRAY[]::text[])`,
  })
    .from(missions)
    .leftJoin(missionsHasTechnologies, eq(missions.id, missionsHasTechnologies.missionId))
    .leftJoin(technologies, eq(missionsHasTechnologies.technologyId, technologies.id))
    .groupBy(missions.id).where(eq(missions.id, id))
    .then(result => result[0])
}

export async function getExpiredMissionsDao() {
  return db.query.missions.findMany({
    with: {
      technologies: {
        with: {
          technology: true
        }
      }
    },
    where: (missions, { lt }) => lt(missions.expirationDate, new Date())
  })
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

export async function truncateExpiredDao() {
  try {
    db.transaction(async tx => {
      try {
        // TODO: One day write a Optimized Stored Procedure
        const expired = await tx.select().from(missions).where(lt(missions.expirationDate, dayjs().startOf('day').toDate()))
        if (expired.length) {
          await tx.delete(missionsHasTechnologies).where(inArray(missionsHasTechnologies.missionId, expired.map(m => m.id)))
          await tx.delete(missions).where(inArray(missions.id, expired.map(m => m.id)))
        }
      } catch (error) {
        tx.rollback()
        throw error
      }
    })
  } catch {
    throw new Error('impossible to delete into database, transaction failed')
  }
}

export async function getExpiredMissionTodayDao() {
  const todayMorning = dayjs().startOf('day').toDate()
  const todayNight = dayjs().endOf('day').toDate()

  return db.query.missions.findMany({
    where: (missions, { between }) => between(missions.expirationDate, todayMorning, todayNight)
  })
}

export async function getCompaniesDao() {
  return db.selectDistinct({ company: missions.company })
    .from(missions)
    .orderBy(missions.company)
    .then(res => res.filter(row => row.company !== null).map<string>(row => row.company ?? ''))
}


export async function getMissionByMaxSalaryDao() {
  const max = await db.select({ max: sql<number>`MAX("salary")` }).from(missions).then(res => res[0].max)

  return db.query.missions.findFirst({
    where: (missions, {eq}) => eq(missions.salary, max)
  })
}