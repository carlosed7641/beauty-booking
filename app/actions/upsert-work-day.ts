'use server'

import prisma from '@/lib/prisma'

export const upsertWorkDay = async (workdays: WorkDays[]) => {
    await prisma.$transaction(
        workdays.map(workday =>
            prisma.workDay.upsert({
                where: {
                    professionalId_name: {
                        professionalId: workday.professionalId ?? '',
                        name: workday.name
                    }
                },
                update: {
                    from: workday.from,
                    to: workday.to,
                    disabled: workday.disabled
                },
                create: {
                    professionalId: workday.professionalId,
                    from: workday.from,
                    to: workday.to,
                    name: workday.name,
                    order: workday.order,
                    disabled: workday.disabled
                }
            })
        )
    )
}