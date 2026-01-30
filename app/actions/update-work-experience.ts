'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const updateWorkExpererience = async (data: WorkExperience) => {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        await prisma.workExperience.update({
            where: { id: data.id },
            data
        })

        revalidatePath('/admin/profile')

        return { ok: true }
    } catch (e) {
        console.error(e)
        throw new Error()
    }
}