'use server'

import prisma from '@/lib/prisma'

export const getUserById = async (id: string) => {

    if (!id) return null

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                entity: true,
                skills: {
                    orderBy: { name: 'asc' }
                },
                workExperiences: {
                    orderBy: { startDate: 'desc' }
                },
                samples: {
                    orderBy: { name: 'asc' },
                    include: {
                        images: true
                    }
                }
            }
        })

        return user

    } catch (error) {
        console.error(error)
        return null
    }
}