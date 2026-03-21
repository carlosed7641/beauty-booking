'use server'

import prisma from '@/lib/prisma'

const SElECT_FIELDS = {
    id: true,
    name: true,
    indicator: true,
    phone: true
}

interface CustomerInput {
    id: string
    name: string | null
    indicator: string | null
    phone: string | null
    birthDay: Date | null
    gender: Gender | null
    userId: string | null,
    user: {
        id: string
        name: string | null
        indicator: string | null
        phone: string | null
        birthDay: Date | null
        photo: string | null
        gender: Gender | null
    } | null
    events: {
        start: Date
        price: number
        status: EventStatus | null
        service: {
            id: string
            name: string
        }
    }[]
}

export const getCustomersByEntityId = async (entityId: string) => {

    try {
        const customers = await prisma.customer.findMany({
            where: {
                entityId,
                OR: [
                    {
                        userId: null
                    },
                    {
                        user: {
                            blockedUsers: {
                                none: {
                                    entityId
                                }
                            }
                        }
                    }
                ]
            },
            select: {
                ...SElECT_FIELDS,
                user: { select: { ...SElECT_FIELDS, photo: true } }
            },
            orderBy: { createdAt: 'asc' }
        })

        return customers.map(({ user, ...data }) => (user ? { ...user, id: data.id } : data) as CustomerInfo)

    } catch (e) {
        console.error(e)
        throw new Error('Ocurrió un error cargando los clientes')
    }

}


export const getCustomersDataByEntityId = async (entityId: string) => {


    const [customers, ratingsAvg] = await Promise.all([
        prisma.customer.findMany({
            where: {
                entityId,
                OR: [
                    {
                        userId: null
                    },
                    {
                        user: {
                            blockedUsers: {
                                none: {
                                    entityId
                                }
                            }
                        }
                    }
                ]
            },
            select: {
                ...SElECT_FIELDS,
                birthDay: true,
                gender: true,
                userId: true,
                events: {
                    orderBy: { start: 'desc' },
                    select: {
                        start: true,
                        price: true,
                        status: true,
                        service: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                user: {
                    select: {
                        ...SElECT_FIELDS,
                        gender: true,
                        birthDay: true,
                        photo: true
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


    return getCustomersData(customers, ratingsMap)

}

const getCustomersData = (customers: CustomerInput[], ratingsMap: Map<string, number | null>) => {

    const customersMap = new Map<string, CustomerData>()

    for (const customer of customers) {

        const completedVisits = customer.events.filter(ev => ev.status === 'completed') ?? []
        const total = completedVisits.reduce((acc, ev) => acc + (ev.price ?? 0), 0)
        const services = Array.from(
            new Map(
                completedVisits.map(({ service }) => [service.id, { id: service.id, name: service.name }])
            ).values()
        )

        customersMap.set(customer.id, {
            id: customer.id,
            name: customer.user?.name ?? customer.name ?? '',
            phone: {
                indicator: customer.user?.indicator ?? customer.indicator ?? '',
                number: customer.user?.phone ?? customer.phone ?? '',
            },
            birthDay: customer.user?.birthDay ?? customer.birthDay,
            gender: customer.user?.gender ?? customer.gender,
            visits: completedVisits.length,
            lastVisit: completedVisits?.[0]?.start,
            total,
            services,
            isAdminCreated: Boolean(customer.userId),
            customerAvgRating: ratingsMap.get(customer.id) ?? null,
            userId: customer.userId
        })
    }

    return Array.from(customersMap.values())
}