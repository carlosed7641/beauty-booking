'use server'

import prisma from '@/lib/prisma'

export const upsertProfessionalService = async (
    professionalId: string,
    services: {
        serviceId: string   
        enabled: boolean
        price: number
        durationHours: number
        durationMinutes: number
    }[]
) => {
    await prisma.$transaction(

        services.map(service =>
            prisma.serviceOverride.upsert({
                where: {
                    serviceId_professionalId: {
                        professionalId,
                        serviceId: service.serviceId
                    }
                },
                update: {
                    enabled: service.enabled,
                    price: service.price,
                    durationHours: service.durationHours,
                    durationMinutes: service.durationMinutes
                },
                create: {
                    professionalId,
                    serviceId: service.serviceId,
                    enabled: service.enabled,
                    price: service.price,
                    durationHours: service.durationHours,
                    durationMinutes: service.durationMinutes
                }
            })
        )
    )
}