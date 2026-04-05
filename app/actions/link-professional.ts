'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'


export const linkProfessional = async (linkingCode: string) => {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error('Unauthorized')

        const entity = await prisma.entity.findUnique({
            where: {
                linkingCode
            },
            select: {
                id: true
            }
        })

        if (!entity) throw new Error('El código expiró o es incorrecto')

        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                entityId: entity.id
            }
        })        
    
    } catch {
        throw new Error('Ocurrió un error inesperado')
    }
}