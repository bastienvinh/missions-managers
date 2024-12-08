import { createUserDao, getUserByEmailDao } from "@/db/repositories/user-repositories";
import { RoleEnum } from "./type";
import { logger } from "@/lib/logger";
import { generateSalt, hashPassword } from "./crypt";
import { AddUser, User } from "@/types/user-types";

export async function signUp(email: string, password: string, name: string, role: RoleEnum) {
  const user = await getUserByEmailDao(email)
  if (user) {
    throw new Error('User already exists')
  }

  logger.info(`Signup: ${email}:${password}`)

  const salt = await generateSalt()
  const hashedPassword = await hashPassword(password, salt)

  const newUser: AddUser = {
    email,
    password: hashedPassword,
    salt,
    name,
    role
  }

  const [userCreated] = await createUserDao(newUser)
  return { email: userCreated.email, role: userCreated.role }
}

export const roleHierarchy = [
  RoleEnum.GUEST,
  RoleEnum.REDACTOR,
  RoleEnum.ADMIN,
  RoleEnum.SUPER_ADMIN
]

export function hasRequiredRole(
  userConnected?: User,
  requestedRole?: RoleEnum
) {
  if (!userConnected || !requestedRole) {
    return false
  }
  // Définir l'ordre des privilèges

  const useRole = userConnected?.role ?? RoleEnum.GUEST
  const userRoleIndex = roleHierarchy.indexOf(useRole as RoleEnum)
  const requestedRoleIndex = roleHierarchy.indexOf(requestedRole)
  if (requestedRoleIndex === -1 || userRoleIndex === -1) {
    return false
  }

  if (userRoleIndex >= requestedRoleIndex) {
    return true
  }
  return false
}