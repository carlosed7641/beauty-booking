'use server'

import prisma from '@/lib/prisma'

export const getEventsByMonth = async (date: Date): Promise<EventDate[]> => {

    const currentDate = new Date(date)

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const startOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)

    const events = await prisma.event.findMany({
        where: {
            start: {
                gte: startOfMonth,
                lt: startOfNextMonth
            }
        },
        include: {
            customer: {
                include: {
                    user: {
                        select: {
                            name: true,
                            indicator: true,
                            phone: true,
                            birthDay: true,
                            gender: true
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
    })

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
            userId: event.customer.userId
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
        isAdminBooking: event.isAdminBooking,
        status: event.status
    }))
}