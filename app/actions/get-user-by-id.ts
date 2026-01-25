'use server'

import prisma from '@/lib/prisma'

export const getUserById = async (id: string) => {

    if (!id) return null

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                entity: true,
                workExperiences: {
                    orderBy: { startDate: 'desc' }
                }
            }
        })

        return user

    } catch (error) {
        console.error(error)
        return null
    }
}