'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteWorkExperience = async (id: string) => {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')
        await prisma.workExperience.delete({ where: { id }})
        revalidatePath('/admin/profile')
        return { ok: true }
    } catch (e) {
        console.error(e)
        return { ok: false, msg: e }
    }
}