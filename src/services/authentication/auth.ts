import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserEmailService } from '../user-service'
import { comparePassword } from './crypt'
// import { logger } from '@/lib/logger'

import {DrizzleAdapter} from '@auth/drizzle-adapter'
import db from '@/db/schema'

export const {signIn, signOut, auth} = NextAuth({
  trustHost: true,
  callbacks: {},
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const user = await getUserEmailService(credentials.email as string)
        if (!user) {
          // logger.error(`Tentative signin with this inexisted email : ${credentials.email}`)
          throw new Error('User no found.')
        }

        const isMachingPassword = await comparePassword(credentials.password as string, user.salt, user.password)
        if (!isMachingPassword) {
          // logger.error(`Tentative signin with this password email : ${credentials.email}`)
          throw new Error('Incorrect Password')
        }

        // logger.info(`Success Signin email : ${credentials.email}`)

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