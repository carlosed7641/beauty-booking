'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

interface CompleteRegistrationPayload {
    entityId: string
    entity: {
        name: string
        address: string
        reference: string
        types: string[]
    }
    services: Record<string, ServiceData[]>
    workdays: WorkDays[]
}

export const completeRegistration = async (payload: CompleteRegistrationPayload) => {

    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    const { entityId, entity, services, workdays } = payload

    await prisma.$transaction(async tx => {
        await tx.entity.update({
            where: { id: entityId },
            data: {
                name: entity.name,
                address: entity.address,
                addressReference: entity.reference,
                shopType: entity.types.join(',')
            }
        })

        const servicesToCreate = Object.entries(services).flatMap(
            ([category, list]) =>
                list.map(s => ({
                    name: s.name,
                    category,
                    price: s.price,
                    durationHours: s.duration.hours,
                    durationMinutes: s.duration.minutes,
                    entityId
                }))
        )

        await tx.service.createMany({
            data: servicesToCreate
        })

        await tx.workDay.createMany({
            data: workdays.map(w => ({
                ...w,
                entityId
            }))
        })

        await tx.user.update({
            where: { id: session.user?.id },
            data: { isRegisterCompleted: true }
        })
    })
}
