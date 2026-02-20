'use server'

import prisma from "@/lib/prisma"

export const getServiceByEntityId = async (entityId: string) => {
    
    try {
        const services = await prisma.service.findMany({
            where: { entityId },
            orderBy: { name: 'asc' }
        })

        return services
    } catch (e) {
        console.error(e)
        throw new Error('Ocurrió un error cargando los sevicios')
    }

}