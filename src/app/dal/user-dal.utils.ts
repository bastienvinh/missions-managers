import { User } from "@/types/user-types"

export type UserDTO = Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt' | 'password' | 'salt'>

export function userDTO(user?: User): UserDTO | undefined {
  if (!user) return undefined
  // const canSee = await canSeeRole() // FIXME: finish it
  return {
    email: user.email ?? '',
    name: user.name ?? '',
    role: user.role,
    id: user.id
  }
}