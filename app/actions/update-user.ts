'use server'

import { auth } from '@/auth.config'
import { UserDTO } from '@/interfaces/user.interface'
import prisma from '@/lib/prisma'


export const updateUser = async (data: UserDTO) => {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        await prisma.user.update({
            where: { id: session?.user?.id },
            data
        })

        return { ok: true }
    } catch (e) {
        console.error(e)
        return { ok: false, message: e }
    }
}