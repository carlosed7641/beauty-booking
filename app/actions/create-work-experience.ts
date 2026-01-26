'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const createWorkExperience = async (data: WorkExperience) => {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        await prisma.workExperience.create({
            data: {
                ...data,
                user: {
                    connect: { id: session.user.id },
                },
            }
        })

        revalidatePath('/admin/profile')

        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}