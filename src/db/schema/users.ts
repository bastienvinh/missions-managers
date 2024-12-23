import {
  boolean,
  timestamp,
  pgTable,
  text,
  integer,
  varchar,
  pgEnum,
  date,
  primaryKey,
  uuid
} from "drizzle-orm/pg-core"
import { AdapterAccountType } from "next-auth/adapters"
import { sql } from "drizzle-orm"

export const roleEnum = pgEnum('roles', [
  'GUEST',
  'REDACTOR',
  'ADMIN',
  'SUPER_ADMIN',
])

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  password: varchar("password").notNull(),
  salt: varchar("salt").notNull(),
  role: roleEnum('role').notNull(),
  createdAt: date('created_at').default(sql`now()`),
  updatedAt: date('updated_at'),
  deletedAt: date('deleted_at')
})

export const accounts = pgTable(
  "account",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
 
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credential_id").notNull().unique(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("provider_account_id").notNull(),
    credentialPublicKey: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credential_device_type").notNull(),
    credentialBackedUp: boolean("credential_backed_up").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

export type UserModel = typeof users.$inferSelect
export type UserAddModel = typeof users.$inferInsert
export type DeleteUserModel = Pick<UserModel, 'id'>

export type SessionModel = typeof sessions.$inferSelect
export type SessionAddModel = typeof sessions.$inferInsert

export type AccountModel = typeof accounts.$inferSelect
export type AccountAddModel = typeof accounts.$inferInsert
export type CreateUser = Omit<UserAddModel, 'id'>