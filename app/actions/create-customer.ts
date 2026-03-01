'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface CustomerDTO {
    birthDay?: Date | null
    gender?: Gender | null
    indicator?: string | null
    name?: string | null
    phone?: string | null
    userId?: string | null
    entityId: string
}

export const createCustomer = async (data: CustomerDTO) => {
    await prisma.customer.create({ data })
    revalidatePath('/admin/schedule')
}