'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteWorkSample = async (id: string) => {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    try {
        await prisma.workSample.delete({ where: { id } })
        revalidatePath('/admin/profile')
        revalidatePath('/admin/work-samples')
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}