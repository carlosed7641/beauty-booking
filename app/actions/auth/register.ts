'use server'

import bcryptjs from 'bcryptjs'
import prisma from '@/lib/prisma'

export const registerUser = async (email: string, password: string, role: 'admin' | 'employee' | 'user') => {
    try {
        const user = await prisma.user.create({
            data: { email: email.toLowerCase(), password: bcryptjs.hashSync(password), role }
        })

         return {
            ok: true,
            message: 'Usuario creado correctamente',
            user
        }
        
    } catch (error) {
        return {
            ok: false,
            message: `No se pudo crear el usuario ${error}`
        }
    }
}