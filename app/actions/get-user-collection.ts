'use server'

import prisma from "@/lib/prisma"
import { getReviews, isLessOrEqualThan } from "@/helpers"

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

export const getUserCollection = async (id: string) => {
    const data = await prisma.user.findUnique({
        where: { id },
        select: {
            customers: {
                select: {
                    events: {
                        where: {
                            status: { in: ['pending', 'completed'] },
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
                                select: ENTITY_FIELDS
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
            }))
            .filter(event => !isLessOrEqualThan(event.start, new Date()) && event.status === 'pending')
            .slice(0, 3) ?? [],
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