'use server'

import prisma from '@/lib/prisma'

export const getFollowers = async (entityId: string) => {
    try {
        const followers = await prisma.follower.findMany(
            {
                where: {
                    entityId,
                    user: {
                        blockedUsers: {
                            none: {
                                entityId
                            }
                        }
                    }
                },
                select: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        )

        return followers.map(({ user }) => user) 

    } catch (e) {
        console.log(e)
    }
}