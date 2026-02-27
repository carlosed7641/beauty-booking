'use server'

import prisma from "@/lib/prisma"

const SElECT_FIELDS = {
    id: true,
    name: true,
    indicator: true,
    phone: true,
}

export const getCustomersByEntityId = async (entityId: string) => {

    try {
        const customers = await prisma.customer.findMany({
            where: {
                entityId,
                OR: [
                    {
                        userId: null
                    },
                    {
                        user: {
                            blockedUsers: {
                                none: {
                                    entityId
                                }
                            }
                        }
                    }
                ]
            },
            select: {
                ...SElECT_FIELDS,
                user: { select: { ...SElECT_FIELDS, photo: true } }
            },
            orderBy: { createdAt: 'asc' }
        })

        return customers.map(({ user, ...data }) => (user ? { ...user, id: data.id } : data) as CustomerInfo)

    } catch (e) {
        console.error(e)
        throw new Error('Ocurrió un error cargando los clientes')
    }

}