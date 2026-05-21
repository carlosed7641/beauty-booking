'use server'

import { signIn } from '@/auth.config'
import prisma from '@/lib/prisma'

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password, redirect: false })
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        followers: {
          select: {
            entityId: true
          }
        }
      }
    })

    return {
      ok: true,
      data: {
        id: user?.id,
        following: user?.followers.map(({ entityId }) => entityId)
      }
    }

  } catch (error) {
    console.error('error', error)
    return { ok: false, message: error }
  }
}