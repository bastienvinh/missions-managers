#!/usr/bin/env node

import pg from 'pg'
import initDotEnv from './env'

initDotEnv()

// You can use that in production
const seed = async () => {
  
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined')
  }

  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL,
  })

  console.log('⏳ Checking connexion ...')
  console.log(`🗄️  URL : ${process.env.POSTGRES_URL}`)

  await client.connect()

  const start = Date.now()

  // password: rootroot1
  // username: bastien@test.fr
  await client.query(` 
      INSERT INTO "public"."users" ("id", "name", "email", "password", "salt", "role", "createdat", "updatedat", "deletedat") VALUES ('f1579709-9ef2-4e67-95cf-8dcd1509d3db', 'Bastien VINH', 'bastien@test.fr', '41aa7ceb301e25f151ad0bd15ee514982968eaa8594ee28bbb06288013969afe', '74aaa8b7fbf4cc3cb6e45ffeaa155045', 'SUPER_ADMIN', '2024-12-08', '2024-12-08', NULL);
    `)

  const end = Date.now()

  console.log('✅ Seed inserted in', end - start, 'ms')

  process.exit(0)
}

export default seed

async function main() {
  try {
    await seed()
  } catch (error) {
    console.error('❌ Connexion failed')
    console.error(error)
    process.exit(1)
  }
}

main()
