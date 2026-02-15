'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const createService = async (data: ServiceItemDTO) => {

    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        await prisma.service.create({ data })

        revalidatePath('/admin/services')

    } catch (e) {
        console.log(e)
        throw new Error('Ocurrió un error al crear el servicio')
    }



}