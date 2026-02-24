'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export const updateService = async (data: Partial<ServiceItemDTO>) => {

    const { serviceId, ...values } = data

    prisma.$transaction(async tx => {

        const currentService = await tx.service.findUnique({
            where: { id: serviceId }
        })

        await tx.service.update({
            where: { id: serviceId },
            data: values
        })

        const overrideValues: any = {}

        if (values.basePrice !== currentService?.basePrice) {
            overrideValues.price = values.basePrice
        }

        if (values.baseDurationHours !== currentService?.baseDurationHours) {
            overrideValues.durationHours = values.baseDurationHours
        }

        if (values.baseDurationMinutes !== currentService?.baseDurationMinutes) {
            overrideValues.durationMinutes = values.baseDurationMinutes
        }

        if (Object.keys(overrideValues).length > 0) {
            await tx.serviceOverride.updateMany({
                where: { serviceId },
                data: overrideValues
            })
        }
    })

    revalidatePath('/admin/services')
    revalidatePath('/admin/professional-settings')

}