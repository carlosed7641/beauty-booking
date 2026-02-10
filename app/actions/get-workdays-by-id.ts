'use server'

import prisma from '@/lib/prisma'

export const getWorkDaysById = async (professionalId: string) => {
    try {
        return await prisma.workDay.findMany({
            where: { professionalId },
            orderBy: { order: 'asc' } 
        })
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}