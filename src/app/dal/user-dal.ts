'use server'

import { getAuthUser } from '@/services/authentication/auth-service'
import * as userRepositories from '@/services/user-service'
import { cache } from 'react'
import { userDTO, UserDTO } from './user-dal.utils'



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

export async function getUsersDal(): Promise<UserDTO[]> {
  return userRepositories.getUsersService().then(users => users.map(user => userDTO(user) as UserDTO))
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

