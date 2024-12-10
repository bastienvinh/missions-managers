import {relations, sql} from 'drizzle-orm'
import { boolean, doublePrecision, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { users } from './users'

export const contractTypes = pgEnum("contract_types", ["Fulltime", "Permanent", "Temporary", "PartTime", "Others"])

export const missions = pgTable('mission', {
  id:  uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
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
  sourceUrl: varchar('source_url')
})

export const technologies = pgTable("technology", {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: varchar("name"),
  description: varchar("description"),
  value: integer("value")
})

export const missionsHasTechnologies = pgTable("missions_has_techonologies", {
  missionId: uuid("mission_id").notNull().references(() => missions.id),
  technologyId: uuid("technology_id").notNull().references(() => technologies.id)
})

export const missionsRelations = relations(missions, ({ many }) => ({
  technologies: many(technologies)
}))