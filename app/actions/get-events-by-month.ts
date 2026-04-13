'use server'

import prisma from '@/lib/prisma'

export const getEventsByMonth = async (date: Date, entityId: string, professionalId: string | null): Promise<EventDate[]> => {

    const currentDate = new Date(date)

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const startOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)

    const [events, ratingsAvg] = await Promise.all([

        prisma.event.findMany({
            where: {
                start: {
                    gte: startOfMonth,
                    lt: startOfNextMonth
                },
                entityId,
                ...(professionalId && { professionalId })
            },
            include: {
                customer: {
                    include: {
                        events: {
                            select: {
                                professionalRating: true
                            }
                        },
                        user: {
                            select: {
                                name: true,
                                indicator: true,
                                phone: true,
                                birthDay: true,
                                gender: true,
                                blockedUsers: {
                                    select: {
                                        entityId: true
                                    }
                                },
                            }
                        }
                    }
                },
                service: {
                    select: {
                        name: true
                    }
                },
                professional: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        }),

        prisma.event.groupBy({
            by: ['customerId'],
            where: {
                entityId,
                professionalRating: { not: null }
            },
            _avg: {
                professionalRating: true
            }
        })
    ])

    const ratingsMap = new Map(
        ratingsAvg.map(r => [r.customerId, r._avg.professionalRating])
    )

    return events.map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        customer: {
            id: event.customer.id,
            name: event.customer.user?.name || event.customer.name || '',
            phone: {
                indicator: event.customer.user?.indicator || event.customer.indicator || '',
                number: event.customer.user?.phone || event.customer.phone || ''
            },
            birthDay: event.customer.user?.birthDay || event.customer.birthDay,
            gender: event.customer.user?.gender || event.customer.gender,
            userId: event.customer.userId,
            isBlocked: event.customer.user?.blockedUsers.map(e => e.entityId).includes(event.entityId) ?? false,
            customerAvgRating: ratingsMap.get(event.customer.id) ?? null
        },
        selectedProfessional: {
            id: event.professional.id,
            name: event.professional.name ?? ''
        },
        selectedService: {
            serviceId: event.serviceId,
            name: event.service.name,
            duration: { hours: event.durationHours, minutes: event.durationMinutes },
            price: event.price
        },
        professionalRating: event.professionalRating,
        typeBooking: event.typeBooking,
        status: event.status
    }))
}