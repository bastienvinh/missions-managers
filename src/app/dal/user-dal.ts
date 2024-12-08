import * as userRepositories from '@/services/user-service'

export async function getUserDal(userId: string) {
  return await userRepositories.getUserService(userId)
}