import bcryptjs from 'bcryptjs'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import prisma from '@/lib/prisma'

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.data = user
            }
            return token
        },
        session({ session, token }) {
            if (token.data) {
                session.user = {
                    ...session.user,
                    ...token.data
                }
            }
            return session
        }
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (!parsedCredentials.success) return null

                const { email, password } = parsedCredentials.data

                const user = await prisma.user.findFirst({ where: { email: email.toLowerCase(), isActive: true } })
                if (!user) return null

                if (!bcryptjs.compareSync(password, user.password)) return null

                const { password: _, ...rest } = user

                return rest

            }
        }),
    ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)