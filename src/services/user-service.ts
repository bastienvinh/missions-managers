import * as userRepository from '@/db/repositories/user-repositories'
import { AddUser } from "@/types/user-types";

export async function createUserService(data: AddUser) {
  if (!data.email) {
    throw new Error('Un email est obligatoire pour créer un utilisateur')
  }

  return userRepository.createUserDao(data)
}

export async function getUserService(userId: string) {
  return userRepository.getUserDao(userId)
}

export async function getUserEmailService(email: string) {
  return userRepository.getUserByEmailDao(email)
}