'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteBlockedUser = async (userId: string, entityId: string) => {
    try {
        await prisma.blockedUser.delete(
            {
                where: {
                    userId_entityId: {
                        userId,
                        entityId
                    }
                }
            }
        )
        revalidatePath('/admin/blocked-users')
    } catch (e) {
        console.log(e)
    }
}

export const blockUser = async (userId: string, entityId: string) => {
    await prisma.blockedUser.create({
        data: {
            userId,
            entityId
        }
    })
}