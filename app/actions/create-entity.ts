'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const createEntity = async (countryId: string) => {

     const session = await auth()
     if (!session?.user?.id) throw new Error()

     const entityId = await prisma.$transaction(async tx => {
          const entity = await tx.entity.create({
               data: {
                    country: {
                         connect: { id: countryId },
                    },
                    owner: {
                         connect: { id: session?.user?.id },
                    }
               }
          })

          await tx.user.update({
               where: { id: session?.user?.id },
               data: { entityId: entity.id }
          })

          return entity.id

     })

     return { id: entityId }
}