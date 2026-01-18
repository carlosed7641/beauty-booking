'use server'

import prisma from '@/lib/prisma'

export const getEntityById = async (id: string) => {

    try {
        const user = await prisma.entity.findUnique({
            where: { id }
        })

        return user

    } catch (error) {
        console.error(error)
        return null
    }
}