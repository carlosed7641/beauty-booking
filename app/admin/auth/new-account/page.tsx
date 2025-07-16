'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Inputs {
    email: string
    password: string
    confirmPassword: string
}

export default function NewAccountPage() {
    const { register, handleSubmit, watch, formState: { isValid } } = useForm<Inputs>()
    const watchPassword = watch('password')
    const watchConfirmPassord = watch('confirmPassword')
    const [showPassword, setShowPassword] = useState(false)


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const { password, confirmPassword } = data

        if (password !== confirmPassword) {
            return
        }

        console.log(data)
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
                    <input className="w-[14px] h-[14px]" type="checkbox" onChange={() => setShowPassword(!showPassword)} />
                    Mostrar contraseña
                </label>
                {watchPassword !== watchConfirmPassord && isValid && <p className="text-red-500">Las contraseñas no son iguales</p>}
                <button className="bg-green-700 text-white rounded-md py-2 font-bold cursor-pointer hover:bg-green-800">Registrarte</button>
                <Link href="/admin/auth/login" className="text-green-700 text-center">¿Ya tienes una cuenta?</Link>
            </form>
        </>
    )
}

