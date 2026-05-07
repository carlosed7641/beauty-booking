'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const deleteUser = async () => {

    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        await prisma.user.update({
            where: { id: session.user.id },
            data: { isActive: false }
        })
    } catch (e) {
        console.log(e)
        throw new Error()
    }

}

export const unlinkEmployee = async (id: string) => {
    await prisma.user.update({
        where: {
            id
        },
        data: {
            entityId: null
        }
    })

    revalidatePath('/admin/linking-professional')
    revalidatePath('/admin/profile')
}