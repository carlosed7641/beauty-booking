'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

interface UpdateUserDTO {
  name?: string
  phone?: string
  indicator?: string
  countryId?: string
  entityId?: string
  isRegisterCompleted?: boolean
}

export const updateUser = async (data: UpdateUserDTO) => {
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