'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const createService = async (data: ServiceItemDTO) => {

    await prisma.$transaction(async tx => {

        const service = await tx.service.create({ data })

        const professionals = await tx.user.findMany({
            where: {
                entityId: data.entityId,
                serviceOverrides: {
                    some: {}
                }
            },
            select: { id: true }
        })

        if (professionals.length > 0) {
            await tx.serviceOverride.createMany({
                data: professionals.map(p => ({
                    professionalId: p.id,
                    serviceId: service.id,
                    price: service.basePrice,
                    durationHours: service.baseDurationHours,
                    durationMinutes: service.baseDurationMinutes
                }))
            })
        }

    })

    revalidatePath('/admin/services')
    revalidatePath('/admin/professional-settings')
}