'use server'

import prisma from '@/lib/prisma'

export const getBlockedUsers = async (entityId: string) => {
    try {
        const blockedList = await prisma.blockedUser.findMany(
            { 
                where: { entityId },
                select: { 
                    user: {
                        select: {
                            id: true,
                            name: true,
                            photo: true,
                            entityId: true
                        }
                    }
                }
            }
        )

        return blockedList.map(({ user }) => user)
    } catch (e) {
        console.log(e)
    }
}