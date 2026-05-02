'use server'

import prisma from '@/lib/prisma'

export const getWorkDaysByEntityId= async (entityId: string) => {
    try {
        return await prisma.workDay.findMany({
            where: { entityId },
            orderBy: { order: 'asc' } 
        })
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}