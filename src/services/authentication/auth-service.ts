'use server'

import { RoleEnum } from "./type"
import { logger } from "@/lib/logger"
import { generateSalt, hashPassword } from "./crypt"
import { AddUser, User } from "@/types/user-types"
import { createUserService, getUserEmailService, getUserService, updateUserService } from "../user-service"
import _ from "lodash"

export async function getAuthUser() {
  // TODO: finish it
}

export async function signUp(email: string, password: string, name: string, role: RoleEnum) {
  const user = await getUserEmailService(email)
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

  const [userCreated] = await createUserService(newUser)
  return { email: userCreated.email, role: userCreated.role }
}

export async function modifyUser(id: string, email: string, password: string, name: string, role: RoleEnum) {
  const user = await getUserService(id)

  if (!user) {
    logger.error(`User doesn't exist : ${id}`)
    throw new Error('User doesn\'t exists')
  }

  const hashedPassword = await hashPassword(password, user.salt)

  // Don't change password if the password is empty
  try {
    await updateUserService({
      id,
      email,
      password: _.isEmpty(password) ? user.password : hashedPassword,
      name,
      role,
      salt: user.salt,
      updatedAt: new Date().toISOString()
    })
  } catch {
    logger.error(`Impossible to modify informations: ${id} : ${email}`)
    throw new Error('Impossible to modify user')
  }

  logger.info(`Change User informations : ${id}: ${email}`)
}

export async function signIn(email: string, password: string) {
  const user = await getUserEmailService(email)
  if (!user) {
    logger.error(`Login tentative: ${email} => user doesn't exist`)
    throw new Error(`User doesn't exists`)
  }

  
}

export const roleHierarchy = [
  RoleEnum.GUEST,
  RoleEnum.REDACTOR,
  RoleEnum.ADMIN,
  RoleEnum.SUPER_ADMIN
]

export async function hasRequiredRole(
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