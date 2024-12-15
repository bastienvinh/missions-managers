import NextAuth, { CredentialsSignin } from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserEmailService } from '../user-service'
import { comparePassword } from './crypt'

import {DrizzleAdapter} from '@auth/drizzle-adapter'
import db from '@/db/schema'

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const user = await getUserEmailService(credentials.email as string)
        if (!user) {
          throw new CredentialsSignin("User doesn't exists")
        }

        const isMachingPassword = await comparePassword(credentials.password as string, user.salt, user.password)
        if (!isMachingPassword) {
          throw new CredentialsSignin("Wrong Password")
        }

        return user
      },
    })
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  adapter: DrizzleAdapter(db)
} satisfies NextAuthConfig)