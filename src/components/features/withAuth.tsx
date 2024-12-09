import React from 'react'

import {UserModel} from '@/db/schema/users'
import {redirect} from 'next/navigation'

import {RoleEnum} from '@/services/authentication/type'
import {
  getAuthUser,
  hasRequiredRole,
} from '@/services/authentication/auth-service'

export type WithAuthProps = {
  user: UserModel
}
const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>,
  requiredRole?: RoleEnum
) => {
  //console.log(`withAuth Component ${WrappedComponent.name} mounted`)
  return async function WithAuth(props: P) {
    const user = await getAuthUser()
    const hasRole = await hasRequiredRole(
      user as UserModel,
      requiredRole ?? RoleEnum.GUEST
    )

    if (!user) {
      redirect('/login')
    }
    if (!hasRole && requiredRole) {
      redirect(`/restricted?role=${requiredRole ?? ''}`)
    }
    if (!hasRole) {
      redirect(`/restricted`)
    }

    return <WrappedComponent {...props} user={user} />
  }
}

export default withAuth

export const withAuthAdmin = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>
) => withAuth(WrappedComponent, RoleEnum.ADMIN)

export const withAuthRedactor = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>
) => withAuth(WrappedComponent, RoleEnum.REDACTOR)

export const withAuthGuest = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>
) => withAuth(WrappedComponent, RoleEnum.GUEST)