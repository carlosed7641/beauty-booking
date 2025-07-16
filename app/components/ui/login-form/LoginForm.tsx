'use client'
import { useState } from 'react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Inputs {
    email: string
    password: string
}

export const LoginForm = ({ isAdmin = false }: { isAdmin?: boolean }) => {

    const { handleSubmit, register } = useForm<Inputs>()
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    }

    const newAccountUrl = isAdmin ? '/admin/auth/new-account' : '/auth/new-account'

    return (
        <>
            { isAdmin && <h1 className="text-2xl text-green-700 mb-4">¡Bienvenido de vuelta!</h1> }
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                    Correo electrónico
                    <input  {...register("email", { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="email" placeholder="tunombre@email.com" />
                </label>
                <label className="flex flex-col gap-2">
                    Contraseña
                    <input {...register("password", { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type={showPassword ? 'text' : 'password'} placeholder="********" />
                </label>
                <label className="flex items-center gap-2">
                    <input className="w-[14px] h-[14px]" type="checkbox" onChange={() => setShowPassword(!showPassword)} />
                    Mostrar contraseña
                </label>
                <input type="submit" className="bg-green-700 text-white rounded-md py-2 font-bold cursor-pointer hover:bg-green-800" value="Iniciar sesión" />
                <hr className="text-zinc-300 my-2" />
                <Link href={newAccountUrl} className="bg-white text-green-700 rounded-md py-2 font-bold cursor-pointer border border-green-700 text-center">Crear una cuenta</Link>
            </form>
        </>
    )
}
