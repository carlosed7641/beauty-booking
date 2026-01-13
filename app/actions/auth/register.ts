'use server'

import { Role } from '@prisma/client'
import prisma from '@/lib/prisma'
import bcryptjs from 'bcryptjs'


export const registerUser = async (email: string, password: string, role: Role = Role.user) => {
    try {
        // password: 123456
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