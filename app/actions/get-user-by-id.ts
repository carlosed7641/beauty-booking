'use server'

import prisma from '@/lib/prisma'
import { WORKDAY_FIELDS } from '@/util/const'

export const getUserById = async (id: string) => {

    if (!id) return null

    try {
        const user = await prisma.user.findUnique({
            where: { 
                id,  
                isActive: true
            },
            include: {
                workDays: {
                    select: WORKDAY_FIELDS,
                    orderBy: { order: 'asc' }
                },
                serviceOverrides: {
                    include: {
                        service: true
                    },
                    orderBy: {
                        service: {
                            name: 'asc'
                        }
                    }
                },
                professionalEvents: {
                    where: {
                        status: { in: ['completed', 'pending']}
                    },
                    select: {
                        id: true,
                        title: true,
                        customerRating: true,
                        customerRatedAt: true,
                        customer: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        photo: true,
                                    }
                                }
                            }
                        }
                    }
                },
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