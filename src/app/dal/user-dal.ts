import * as userRepositories from '@/services/user-service'
import { User } from '@/types/user-types'

export type UserDao = Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt' | 'password' | 'salt'>

export async function getUserDal(userId: string): Promise<UserDao| undefined> {
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