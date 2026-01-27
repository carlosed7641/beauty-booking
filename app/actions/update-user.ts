'use server'

import { auth } from '@/auth.config'
import { Prisma } from '@/generated/prisma/client'
import { uploadImage } from '@/helpers/upload-image'
import { UserDTO } from '@/interfaces/user.interface'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'


export const updateUser = async (data: UserDTO) => {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        const { photo, ...rest } = data
        const prismaData:  Prisma.UserUpdateInput = { ...rest }
        
        if (photo) {
            const images = await uploadImage(photo)
            if (!images) throw new Error('Error al subir imagen')  
           prismaData.photo = images[0]
        } 

        await prisma.user.update({
            where: { id: session?.user?.id },
            data: prismaData
        })

        revalidatePath('/admin')
        revalidatePath('/admin/profile')

        return { ok: true }
    } catch (e) {
        console.error(e)
        return { ok: false, message: e }
    }
}


