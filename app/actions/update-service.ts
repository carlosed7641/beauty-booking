'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export const updateService = async (data: Partial<ServiceItemDTO>) => {
    try {
        const { serviceId, ...values } = data
        await prisma.service.update({
            where: { id: serviceId },
            data: values
        })

        revalidatePath('/admin/services')
    } catch (e) {
        console.log(e)
        throw new Error('Ocurrión un error actualizando el servicio')
    }
}