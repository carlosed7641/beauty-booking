'use server'

import prisma from "@/lib/prisma"

export const searchEntity = async (contains: string, take?: number) => {

    const [results, total] = await Promise.all([
        prisma.entity.findMany({
            select: {
                id: true,
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
                },
                events: {
                    where: {
                        status: 'completed'
                    },
                    select: {
                        id: true,
                        customerRating: true
                    }
                }
            },
            where: {
                name: { contains, mode: 'insensitive' }
            },
            ...(take && { take: 3 })
        }),
        prisma.entity.count({
            where: {
                name: { contains, mode: 'insensitive' }
            }
        })
    ])

    return { results, total }
}
