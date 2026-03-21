'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface Props {
    id: string
    entityId: string
    name?: string
    indicator?: string
    phone?: string
}

export const updateCustomer = async ({
    id,
    entityId,
    name,
    indicator,
    phone
}: Props) => {
    await prisma.customer.update({
        where: {
            id,
            entityId
        },
        data: {
            name,
            indicator,
            phone
        }
    })

    revalidatePath('/admin/customers')
}