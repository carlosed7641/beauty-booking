'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const updateSkill = async (data: Skill) => {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        await prisma.skill.update({
            where: { id: data.id },
            data
        })

        revalidatePath('/admin/profile')

        return { ok: true }
    } catch (e) {
        console.error(e)
        return { ok: false, message: e }
    }
}