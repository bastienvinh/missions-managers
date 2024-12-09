'use server'

import { getAuthUser } from '@/services/authentication/auth-service'
import * as userRepositories from '@/services/user-service'
import { User } from '@/types/user-types'
import { cache } from 'react'

export type UserDTO = Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt' | 'password' | 'salt'>

export async function getUserDal(userId: string): Promise<UserDTO| undefined> {
  const user = await userRepositories.getUserService(userId)

  if (!user) {
    return undefined
  }

  return {
    email: user.email,
    id: user.id,
    name: user.name,
    role: user.role
  }
}

export const getConnectedUser = cache(async () => {
  try {
    const user = await getAuthUser()
    return userDTO(user)
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
})

export async function userDTO(user?: User): Promise<UserDTO | undefined> {
  if (!user) return undefined
  // const canSee = await canSeeRole() // FIXME: finish it
  return {
    email: user.email ?? '',
    name: user.name ?? '',
    role: user.role,
    id: user.id
  }
}