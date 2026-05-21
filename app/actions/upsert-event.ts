'use server'

import prisma from '@/lib/prisma'
import { EventStatus } from '@/generated/prisma/enums'
import { getTotalMinutes } from '@/helpers'
import { auth } from '@/auth.config'
import { revalidatePath } from 'next/cache'

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
                    gender: true,
                    blockedUsers: true
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

export const upsertEvent = async (event: Event): Promise<EventDate> => {

    const start = new Date(event.selectedDate as Date)
    const [hours, minutes] = event.selectedHour!.split(':').map(Number)
    start.setHours(hours, minutes, 0, 0)

    const duration = getTotalMinutes({ hours: event.durationHours, minutes: event.durationMinutes })
    const end = new Date(start.getTime() + duration * 60000)

    let eventResponse

    const session = await auth()

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

        let customerId = event.customer?.id

        if (!customerId) {
            if (!event.userId) throw new Error('Ocurrió un error al crear evento')
            const existingCustomer = await prisma.customer.findFirst({
                where: { userId: event.userId, entityId: event.entityId },
                select: { id: true }
            })

            if (existingCustomer?.id) {
                customerId = existingCustomer.id
            } else {
                const newCustomer = await prisma.customer.create({
                    data: {
                        entityId: event.entityId,
                        userId: event.userId
                    }
                })

                customerId = newCustomer.id
            }
        }

        eventResponse = await prisma.event.create({
            data: {
                customerId,
                start,
                end,
                typeBooking: session?.user?.role ?? '',
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

    revalidatePath('/')
    revalidatePath('/my-reservations')

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
            userId: eventResponse.customer.userId,
            isBlocked: eventResponse.customer.user?.blockedUsers.map(e => e.entityId).includes(event.entityId) ?? false
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
        typeBooking: eventResponse.typeBooking,
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

    revalidatePath('/')
    revalidatePath('/my-reservations')
}

interface Props {
    id: string
    professionalRating?: number
    customerRating?: number
}

export const updateEventReview = async ({ id, professionalRating }: Props) => {

    const data: any = {}

    if (professionalRating) {
        data.professionalRating = professionalRating
        data.professionalRatedAt = new Date()
    }

    if (Object.keys(data).length === 0) return

    professionalRating === 1
        ? data.status = 'aborted'
        : data.status = 'completed'

    await prisma.event.update(({
        data,
        where: { id }
    }))

}

export const updateEventUserRate = async ({ id, customerRating }: Props) => {

    const data: any = {}

    if (customerRating) {
        data.customerRating = customerRating
        data.customerRatedAt = new Date()
    }

    if (Object.keys(data).length === 0) return

    data.expiredViewed = true

    await prisma.event.update(({
        data,
        where: { id }
    }))
}


export const updateExpiredEvents = async (evetns: EventReview[]) => {
    await prisma.event.updateMany({
        where: {
            id: {
                in: evetns.map(ev => ev.id)
            }
        },
        data: {
            expiredViewed: true
        }
    })
}