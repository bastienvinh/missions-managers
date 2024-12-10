'use server'

import db from "../schema"

export async function getSourcesDao() {
  return db.query.sources.findMany()
}
