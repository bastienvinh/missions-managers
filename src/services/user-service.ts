import * as userRepository from '@/db/repositories/user-repositories'
import { UserAddModel } from '@/db/schema/users'
import { AddUser } from "@/types/user-types"
import { RoleEnum } from './authentication/type'

export async function createUserService(data: AddUser) {
  if (!data.email) {
    throw new Error('Un email est obligatoire pour créer un utilisateur')
  }

  return userRepository.createUserDao(data)
}

export async function getUserService(userId: string) {
  return userRepository.getUserDao(userId)
}

export async function getUsersService() {
  return userRepository.getUsersDao()
}

export async function getUserEmailService(email: string) {
  return userRepository.getUserByEmailDao(email)
}

export async function updateUserService(user: UserAddModel) {
  await userRepository.updateUserDao(user)
}

export async function setRoleService(userId: string, role: RoleEnum) {
  await userRepository.setRoleDao(userId, role)
}