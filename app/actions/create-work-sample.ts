'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { auth } from '@/auth.config'
import { uploadImage } from '@/helpers/upload-image'

interface SampleDTO extends Omit<WorkSample, 'id'> { }

export const createWorkSample = async (payload: SampleDTO) => {

    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    const { name, category, entityId, authorId } = payload

    const fileImages = payload.images.map(image => image.file) as File[]
    const images = await uploadImage(fileImages) as string[]
    if (!images) throw new Error('Error al subir imágenes')

    await prisma.$transaction(async tx => {

        const sample = await tx.workSample.create({
            data: { name, category, entityId, authorId }
        })

        await tx.workSampleImage.createMany({
            data: payload.images.map((image, idx) => ({
                sampleId: sample.id,
                main: image.main,
                url: images[idx]
            }))
        })


    })

    revalidatePath('/admin/profile')
    revalidatePath('/admin/work-samples')
}