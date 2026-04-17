'use server'

import prisma from '@/lib/prisma'

export const getEntityEmployeeData = async (id: string) => {
    return await prisma.entity.findUnique({
        where: { id },
        select: {
            users: {
                select: {
                    id: true,
                    name: true
                },
                where: {
                    role: 'employee',
                    isRegisterCompleted: true,
                    isActive: true
                }
            },
            linkingCode: true,
        }
    })
}