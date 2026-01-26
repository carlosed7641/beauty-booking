'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const createSkill = async (data: Skill) => {

    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        await prisma.skill.create({
            data: {
                ...data,
                user: {
                    connect: { id: session.user.id },
                }
            }
        })

        revalidatePath('/admin/profile')

        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }



}