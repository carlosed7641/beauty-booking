'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const createWorkDay = async (data: WorkDays[]) => {

    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')
        await prisma.workDay.createMany({ data })
        revalidatePath('/admin/professional-settings')
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}