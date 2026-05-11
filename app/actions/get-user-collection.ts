'use server'

import prisma from "@/lib/prisma"

export const getUserCollection = async (id: string) => {
    const data = await prisma.user.findUnique({
        where: { id },
        select: {
            customers: {
                select: {
                    events: {
                        take: 3,
                        where: {
                            start: {
                                gt: new Date()
                            },
                            status: 'pending'
                        },
                        orderBy: {
                            start: 'asc'
                        },
                        include: {
                            professional: {
                                select: {
                                    name: true,
                                    photo: true,
                                }
                            },
                            entity: { select: { id: true, name: true } },
                            service: { select: { category: true } },
                            customer: {
                                include: {
                                    user: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return {
        events: data?.customers[0].events.map(event => ({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            entity: {
                id: event.entity.id,
                name: event.entity?.name ?? ''
            },
            customer: {
                id: event.customer.id,
                name: event.customer.user?.name ?? '',
                phone: {
                    indicator: event.customer.user?.indicator ?? '',
                    number: event.customer.user?.phone ?? ''
                },
                birthDay: event.customer.user?.birthDay,
                gender: event.customer.user?.gender
            },
            selectedService: {
                serviceId: event.serviceId,
                name: event.title,
                category: event.service.category,
                duration: {
                    hours: event.durationHours,
                    minutes: event.durationMinutes
                },
                price: event.price
            },
            selectedProfessional: {
                id: event.professionalId,
                name: event.professional.name ?? '',
                photo: event.professional.photo ?? undefined
            },
            typeBooking: event.typeBooking,
            status: event.status
        })) ?? []
    }
}