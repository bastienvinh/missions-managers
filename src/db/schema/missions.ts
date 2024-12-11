import {relations, sql} from 'drizzle-orm'
import { boolean, doublePrecision, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { users } from './users'
import { v4 as uuid_v4 } from 'uuid'

export const contractTypes = pgEnum("contract_types", ["Fulltime", "Permanent", "Temporary", "PartTime", "Internship", "Others"])

export const missions = pgTable('mission', {
  id:  uuid('id')
    .default(uuid_v4())
    .primaryKey(),
  title: varchar("title").notNull(),
  company: varchar("company"),
  description: text("description"),
  expirationDate: timestamp("expiration_date"),
  likeLevel: integer("like_level"),
  salary: doublePrecision("salary"),
  type: contractTypes("type"),
  requirements: text("requirements"),
  benefits: text("benefits"),
  drawbacks: text("drawbacks"),
  authorId: uuid("author_id").notNull().references(() => users.id),
  analytics: boolean('analytics').default(true),
  sourceUrl: varchar('source_url'),
  sourceId: uuid("source_id").notNull().references(() => sources.id),
})

export const technologies = pgTable("technology", {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description"),
  value: integer("value")
})

export const missionsHasTechnologies = pgTable("missions_has_techonologies", {
  missionId: uuid("mission_id").notNull().references(() => missions.id),
  technologyId: uuid("technology_id").notNull().references(() => technologies.id)
})

export const missionsRelations = relations(missions, ({ many, one }) => ({
  technologies: many(technologies),
  source: one(sources, {
    fields: [missions.sourceId],
    references: [sources.id]
  })
}))

export const sources = pgTable("source", {
  id: uuid('id')
  .default(sql`uuid_generate_v4()`)
  .primaryKey(),
  name: varchar("name").notNull()
})

export type TechnologyModel = typeof technologies.$inferSelect
export type TechnologyAddModel= typeof technologies.$inferInsert

export type MissionModel = typeof missions.$inferSelect
export type MissionAddModel = typeof missions.$inferInsert

export type MissionAddUpdateModel = MissionAddModel & { technologies?: string[] }