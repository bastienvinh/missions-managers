import {defineConfig} from 'drizzle-kit'
import initDotEnv from '@/db/scripts/env'

initDotEnv()

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/*',
  out: './drizzle/migrations',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string
  },
  verbose: true,
  strict: true,
  introspect: {
    casing: 'camel'
  }
})