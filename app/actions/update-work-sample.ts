'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { auth } from '@/auth.config'
import { uploadImage } from '@/helpers/upload-image'


export const updateWorkSample = async (payload: WorkSample, deletedImages: string[]) => {

    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    const { id, name, category } = payload

    const existingImages = payload.images.filter(img => img.id && img.url.startsWith('https'))
    
    const newImages = payload.images.filter(image => !image.url.startsWith('https'))
    let uploadedImages: string[] = []

    if (newImages.length > 0) {
        const fileImages = newImages.map(image => image.file) as File[]
        uploadedImages = await uploadImage(fileImages) as string[]
        if (!uploadedImages) throw new Error('Error al subir imágenes')
    }

    await prisma.$transaction(async tx => {

        await tx.workSample.update({
            where: { id },
            data: { name, category }
        })


        await Promise.all(
            existingImages.map(image =>
                tx.workSampleImage.update({
                    where: { id: image.id, sampleId: id },
                    data: {
                        main: image.main,
                    }
                })
            )
        )

        if (deletedImages.length > 0) {
            await Promise.all(
                deletedImages.map(imageId =>
                    tx.workSampleImage.delete({
                        where: { id: imageId, sampleId: payload.id }
                    })
                )
            )
        }


        if (uploadedImages.length > 0) {
            await tx.workSampleImage.createMany({
                data: newImages.map((image, idx) => ({
                    sampleId: id,
                    main: image.main,
                    url: uploadedImages[idx]
                }))
            })
        }


    })

    revalidatePath('/admin/profile')
    revalidatePath('/admin/work-samples')

}