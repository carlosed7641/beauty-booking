'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { registerUser } from '@/actions'
import { Role } from '@/generated/prisma/client'

interface Inputs {
    email: string
    password: string
    confirmPassword: string
}

export default function NewAccountPage() {
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { isValid } } = useForm<Inputs>()
    const watchPassword = watch('password')
    const watchConfirmPassord = watch('confirmPassword')
    const [showPassword, setShowPassword] = useState(false)


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { password, confirmPassword } = data

        if (password !== confirmPassword) {
            return
        }

        const response = await registerUser(data.email, data.password, Role.admin)

        if (!response.ok) {
            console.error(response.message)
            return
        }

        console.log(response)
        // router.push('/admin')
    }

    return (
        <>
            <h1 className="text-2xl text-green-700 mb-4">Crea una cuenta</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                    Correo electrónico
                    <input {...register('email', { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="email" placeholder="tunombre@email.com" />
                </label>
                <label className="flex flex-col gap-2">
                    Contraseña
                    <input {...register('password', { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type={showPassword ? 'text' : 'password'} placeholder="********" />
                </label>
                <label className="flex flex-col gap-2">
                    Confirmar contraseña
                    <input {...register('confirmPassword', { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type={showPassword ? 'text' : 'password'} placeholder="********" />
                </label>
                <label className="flex items-center gap-2">
                    <input className="w-3.5 h-3.5" type="checkbox" onChange={() => setShowPassword(!showPassword)} />
                    Mostrar contraseña
                </label>
                {watchPassword !== watchConfirmPassord && isValid && <p className="text-red-500">Las contraseñas no son iguales</p>}
                <button className="btn-primary rounded-md font-bold">Registrarte</button>
                <Link href="/admin/auth/login" className="text-green-700 text-center">¿Ya tienes una cuenta?</Link>
            </form>
        </>
    )
}

