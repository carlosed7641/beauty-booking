'use server'

import prisma from '@/lib/prisma'
import { EventStatus } from '@/generated/prisma/enums'
import { getTotalMinutes } from '@/helpers'

interface Event extends ServiceState {
    price: number
    durationHours: number
    durationMinutes: number
    entityId: string
}

const include = {
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

export const upsertEvent = async (event: Event, isAdminBooking = false): Promise<EventDate> => {

    const start = new Date(event.selectedDate as Date)
    const [hours, minutes] = event.selectedHour!.split(':').map(Number)
    start.setHours(hours, minutes, 0, 0);

    const duration = getTotalMinutes({ hours: event.durationHours, minutes: event.durationMinutes })
    const end = new Date(start.getTime() + duration * 60000)

    let eventResponse

    if (event.id) {
        eventResponse = await prisma.event.update({
            where: {
                id: event.id
            },
            data: {
                start,
                end,
                professionalId: event.selectedProfessional?.id ?? '',
                title: event.selectedService?.name ?? '',
                price: event.price,
                durationHours: event.durationHours,
                durationMinutes: event.durationMinutes
            },
            include
        })

    } else {
        eventResponse = await prisma.event.create({
            data: {
                customerId: event.customer?.id ?? '',
                start,
                end,
                isAdminBooking,
                professionalId: event.selectedProfessional?.id ?? '',
                serviceId: event.selectedService?.serviceId ?? '',
                status: EventStatus.pending,
                title: event.selectedService?.name ?? '',
                price: event.price,
                durationHours: event.durationHours,
                durationMinutes: event.durationMinutes,
                entityId: event.entityId
            },
            include
        })
    }

    return {
        id: eventResponse.id,
        title: eventResponse.title,
        start: eventResponse.start,
        end: eventResponse.end,
        customer: {
            id: eventResponse.customer.id,
            name: eventResponse.customer.user?.name || eventResponse.customer.name || '',
            phone: {
                indicator: eventResponse.customer.user?.indicator || eventResponse.customer.indicator || '',
                number: eventResponse.customer.user?.phone || eventResponse.customer.phone || ''
            },
            birthDay: eventResponse.customer.user?.birthDay || eventResponse.customer.birthDay,
            gender: eventResponse.customer.user?.gender || eventResponse.customer.gender,
            userId: eventResponse.customer.userId
        },
        selectedProfessional: {
            id: eventResponse.professional.id,
            name: eventResponse.professional.name ?? ''
        },
        selectedService: {
            serviceId: eventResponse.serviceId,
            name: eventResponse.service.name,
            duration: { hours: eventResponse.durationHours, minutes: eventResponse.durationMinutes },
            price: eventResponse.price
        },
        isAdminBooking: eventResponse.isAdminBooking,
        status: eventResponse.status
    }
}

export const cancelEvent = async (id: string, professionalId: string) => {
    await prisma.event.update({
        data: {
            status: EventStatus.cancelled
        },
        where: {
            id,
            professionalId
        }
    })
}

interface Props {
    id: string
    professionalRating?: number
}

export const updateEventReview = async ({ id, professionalRating }: Props) => {

    const data: any = {}

    if (professionalRating) {
        data.professionalRating = professionalRating
        data.professionalRatedAt = new Date()
    }

    if (Object.keys(data).length === 0) return

    await prisma.event.update(({
        data,
        where: { id }
    }))

}