import { RoleEnum } from "@/services/authentication/type"
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

export const roleHierarchy = [
  RoleEnum.GUEST,
  RoleEnum.REDACTOR,
  RoleEnum.ADMIN,
  RoleEnum.SUPER_ADMIN
]

export function hasRequiredRole(
  userConnected?: UserDTO,
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