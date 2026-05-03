'use server'

import prisma from "@/lib/prisma"

export const toggleFollower = async (entityId: string, userId: string, alreadyFollow: boolean) => {

    if (alreadyFollow) {
        await prisma.follower.delete({
            where: {
                userId_entityId: {
                    entityId,
                    userId
                }
            }
        })
    } else {
        await prisma.follower.create(({ data: { entityId, userId } }))
    }
}