'use server'

import prisma from "@/lib/prisma"
import { getReviews } from "@/helpers"

const ENTITY_FIELDS = {
    id: true,
    numberId: true,
    name: true,
    logo: true,
    events: {
        where: {
            status: 'completed'
        },
        select: {
            customerRating: true
        }
    }
} as const

export const getUserCollection = async ({
    id,
    status
}: {
    id: string
    status?: EventStatus[]
}) => {
    const data = await prisma.user.findUnique({
        where: { id },
        select: {
            customers: {
                select: {
                    events: {
                        where: {
                            ...(status && { status: { in: status } }),
                            service: { archived: false }
                        },
                        include: {
                            professional: {
                                select: {
                                    name: true,
                                    photo: true,
                                }
                            },
                            entity: {
                                select: {
                                    ...ENTITY_FIELDS,
                                    cancelDateTime: true
                                },
                            },
                            service: {
                                select: {
                                    name: true,
                                    id: true,
                                    category: true,
                                    baseDurationHours: true,
                                    baseDurationMinutes: true,
                                    basePrice: true
                                }
                            },
                            customer: {
                                include: {
                                    user: true
                                }
                            }
                        }
                    }
                }
            },
            followers: {
                select: {
                    entity: {
                        select: ENTITY_FIELDS
                    }
                }
            }
        }
    })

    const events =
        data?.customers.flatMap(item => item.events) ?? []

    const seen = new Set()

    return {
        nextReservations: events
            .sort((a, b) => a?.start.getTime() - b?.start.getTime())
            .map(event => ({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                customerRating: event.customerRating,
                entity: {
                    id: event.entity.id,
                    name: event.entity?.name ?? '',
                    cancelDateTime: event?.entity?.cancelDateTime
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
            }))
            .filter(event => status ? event.start.getTime() >= new Date().getTime() && event.status === 'pending' : true)
            .slice(0, status ? 3 : undefined),
        services:
            events
                .sort((a, b) => b?.start.getTime() - a?.start.getTime())
                .map(({ entity, service }) => {
                    const { ratingCount, ratingPotins } = getReviews(entity.events)
                    return {
                        ctaData: {
                            serviceId: service.id,
                            price: service.basePrice,
                            name: service.name,
                            duration: {
                                hours: service.baseDurationHours,
                                minutes: service.baseDurationMinutes
                            }
                        },
                        href: `/entity/${entity.numberId}`,
                        imageSrc: entity.logo,
                        ratingCount,
                        ratingPotins,
                        serviceName: service.name,
                        shopName: entity.name ?? ''
                    }
                })
                .filter(item => {
                    const id = item.ctaData.serviceId

                    if (seen.has(id)) return false

                    seen.add(id)
                    return true
                })
                .slice(0, 5) ?? [],
        favorites: data?.followers.map(({ entity }) => {
            const { ratingCount, ratingPotins } = getReviews(entity.events)
            return {
                numberId: entity.numberId,
                imageSrc: entity.logo,
                name: entity.name,
                reviews: {
                    points: ratingPotins,
                    counts: ratingCount
                }
            }
        }) ?? []
    }
}