'use server'

import prisma from '@/lib/prisma'


const WORKDAY_FIELDS = {
    id: true,
    from: true,
    order: true,
    to: true,
    name: true,
    disabled: true,
    professionalId: true
}

export const getEntityById = async (id: string | number) => {

    try {
        const entity = await prisma.entity.findFirst({
            where: {
                OR: [
                    { id: typeof id === 'string' ? id : undefined },
                    { numberId: typeof id === 'number' ? id : undefined }
                ]
            },
            include: {
                workdays: {
                    select: WORKDAY_FIELDS,
                    orderBy: { order: 'asc' }
                },
                users: {
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
                        }
                    },
                    where: {
                        isActive: true
                    }
                },
                services: {
                    orderBy: { name: 'asc' }
                },
                followers: {
                    where: {
                        user: {
                            blockedUsers: {
                                none: {
                                    entity: {
                                        OR: [
                                            { id: typeof id === 'string' ? id : undefined },
                                            { numberId: typeof id === 'number' ? id : undefined }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    select: {
                        id: true
                    }
                },
                events: {
                    where: {
                        status: 'completed'
                    },
                    select: {
                        id: true
                    }
                },
                samples: {
                    include: {
                        images: true,
                        author: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        return entity

    } catch (error) {
        console.error(error)
        return null
    }
}