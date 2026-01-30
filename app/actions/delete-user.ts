'use server'

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