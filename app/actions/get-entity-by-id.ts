'use server'

import prisma from '@/lib/prisma'
import { WORKDAY_FIELDS } from '@/util/const'

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
                        },
                        professionalEvents: {
                            where: {
                                status: 'completed'
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