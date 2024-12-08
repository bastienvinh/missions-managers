import db from "../schema";
import { UserAddModel, users } from "../schema/users";

export function getUserByEmailDao(email: string) {
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