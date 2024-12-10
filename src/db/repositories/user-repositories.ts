'use server'

import { eq } from "drizzle-orm"
import db from "../schema"
import { UserAddModel, users } from "../schema/users"
import { RoleEnum } from "@/services/authentication/type"

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

export async function getUsersDao() {
  const users = await db.query.users.findMany({ where: (users, { isNull, ne, and }) => and(isNull(users.deletedAt), ne(users.role, RoleEnum.SUPER_ADMIN)) })
  return users ?? []
}

export async function updateUserDao(user: UserAddModel) {

  if (!user.id) {
    throw new Error('Update => user.id is not filled')
  }

  await db.update(users).set(user).where(eq(users.id, user.id))
}

export async function setRoleDao(userId: string, role: RoleEnum) {
  await db.update(users).set({ role }).where(eq(users.id, userId))
}

export async function deleteUserDao(userId: string) {
  await db.update(users).set({ deletedAt: new Date().toISOString() }).where(eq(users.id, userId))
}