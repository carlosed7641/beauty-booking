'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/auth.config'
import { revalidatePath } from 'next/cache'
import { uploadImage } from '@/helpers/upload-image'


interface EntityDTO {
    entityId: string
    cancelDateTime?: number
    showAdminAgenda?: boolean
    advanceBookingControl?: number
    name?: string
    shopType?: string
    logo?: { url: string, file?: File[] } | null
    cover?: { url: string, file?: File[] } | null
    address?: string
    addressReference?: string
}

export const updateEntity = async (payload: EntityDTO) => {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        const { entityId, logo, cover, ...values } = payload
        const data: any = { ...values }

        if (logo !== undefined) {
            let logoUrl = logo?.url

            if (logo?.file?.length) {
                const uploaded = await uploadImage(logo.file) as string[]
                logoUrl = uploaded?.[0]
                if (!logoUrl) throw new Error('Error al subir logo')
            }

            data.logo = logoUrl ?? null
        }

        if (cover !== undefined) {
            let coverUrl = cover?.url

            if (cover?.file?.length) {
                const uploaded = await uploadImage(cover.file) as string[]
                coverUrl = uploaded?.[0]
                if (!coverUrl) throw new Error('Error al subir cover')
            }

            data.cover = coverUrl ?? null
        }

        console.log(data)

        await prisma.entity.update({
            where: { id: entityId },
            data
        })

        revalidatePath('/admin/settings')

    } catch (e) {
        console.log(e)
        throw new Error()
    }

}