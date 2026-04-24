'use server'

import prisma from "@/lib/prisma"

export const searchEntity = async (contains: string) => {

    const [results, total] = await Promise.all([
        prisma.entity.findMany({
            select: {
                numberId: true,
                logo: true,
                name: true,
                address: true,
                _count: {
                    select: {
                        followers: true,
                        events: {
                            where: {
                                status: 'completed'
                            }
                        }
                    }
                }
            },
            where: {
                name: { contains, mode: 'insensitive' }
            },
            take: 3
        }),
        prisma.entity.count({
            where: {
                name: { contains, mode: 'insensitive' }
            }
        })
    ])

    return { results, total }
}
