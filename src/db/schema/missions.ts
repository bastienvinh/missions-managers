import {relations, sql} from 'drizzle-orm'
import { boolean, date, doublePrecision, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { users } from './users'

export const contractTypes = pgEnum("contract_types", ["Fulltime", "Permanent", "Temporary", "PartTime", "Internship", "Others"])

export const missions = pgTable('mission', {
  id:  uuid('id')
    .default(sql`uuid_generate_v4()`)
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
  createdAt: date("created_at").notNull().default(sql`NOW()`),
  updatedAt: date("updated_at").notNull().default(sql`NOW()`)
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
  technologies: many(missionsHasTechnologies),
  source: one(sources, {
    fields: [missions.sourceId],
    references: [sources.id]
  })
}))

export const technologiesHasMissions = relations(technologies, ({ many }) => ({
  missions: many(missionsHasTechnologies)
}))

export const missionsToTechnologies = relations(missionsHasTechnologies, ({ one }) => ({
  mission: one(missions, {
    fields: [missionsHasTechnologies.missionId],
    references: [missions.id]
  }),
  technology: one(technologies, {
    fields: [missionsHasTechnologies.technologyId],
    references: [technologies.id]
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