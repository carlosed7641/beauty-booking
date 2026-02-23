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

export const getEntityById = async (id: string) => {

    try {
        const entity = await prisma.entity.findUnique({
            where: { id },
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
                    }
                },
                services: {
                    orderBy: { name: 'asc' }
                }
            }
        })

        return entity

    } catch (error) {
        console.error(error)
        return null
    }
}