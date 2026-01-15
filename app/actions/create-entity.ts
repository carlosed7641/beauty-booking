'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const createEntity = async (countryId: string) => {

     try {
          const session = await auth()
          if (!session?.user?.id) throw new Error()

          const { id } = await prisma.entity.create({
               data: {
                    country: {
                         connect: { id: countryId },
                    },
                    owner: {
                         connect: { id: session.user.id },
                    }
               }
          })
          return { ok: true, id }
     } catch (e) {
          console.log(e)
          return { ok: false }
     }
}