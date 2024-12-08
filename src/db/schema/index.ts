import postgres from 'postgres'
import {drizzle} from 'drizzle-orm/postgres-js'

import * as users from './users'
import * as missions from './missions'

const bddUrl = process.env.POSTGRES_URL ?? ''

const pool = postgres(bddUrl, {max: 1})

const db = drizzle(pool, {
  schema: {...users, ...missions},
})

export default db
