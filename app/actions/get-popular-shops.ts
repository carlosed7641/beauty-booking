'use server'

import prisma from "@/lib/prisma"

export const getPopularShops = async () => {

    return await prisma.entity.findMany({
        take: 6,
        orderBy: {
            events: {
                _count: 'desc'
            }
        },
        select: {
            numberId: true,
            name: true,
            logo: true,
            events: {
                where: {
                    status:{ in: ['completed', 'pending']}
                },
                select: {
                    id: true,
                    customerRating: true
                }
            }
        }
    })
}