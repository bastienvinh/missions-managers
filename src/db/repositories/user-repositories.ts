'use server'

import { eq } from "drizzle-orm"
import db from "../schema"
import { UserAddModel, users } from "../schema/users"

export async function getUserByEmailDao(email: string) {
  return db.query.users.findFirst({
    where: (user, {eq}) => eq(user.email, email)
  })
}

export async function createUserDao(newUser: UserAddModel) {
  return db.insert(users).values(newUser).returning()
}

export async function getUserDao(id: string) {
  try {
    const user = await db.query.users.findFirst({
      where: (user, {eq}) => eq(user.id, id)
    })
    return user
  } catch {
    return undefined
  }
}

export async function updateUserDao(user: UserAddModel) {

  if (!user.id) {
    throw new Error('Update => user.id is not filled')
  }

  await db.update(users).set(user).where(eq(users.id, user.id))
}