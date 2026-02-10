'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const updateWorkDay = async (data: WorkDays[]) => {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        await prisma.$transaction(
            data.map(day =>
                prisma.workDay.update({
                    where: { id: day.id },
                    data: {
                        disabled: day.disabled,
                        from: day.from,
                        to: day.to
                    }
                })
            )
        )

        revalidatePath('/admin/work-days')
        revalidatePath('/admin/professional-settings')

    } catch (e) {
        console.error(e)
        throw new Error()
    }
}