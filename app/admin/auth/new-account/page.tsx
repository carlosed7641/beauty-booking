'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import { login, registerUser } from '@/actions'
import { CgSpinner } from 'react-icons/cg'

interface Inputs {
    email: string
    password: string
    confirmPassword: string
    role: 'admin' | 'employee' | 'user'
}

export default function NewAccountPage() {
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { isValid } } = useForm<Inputs>()
    const watchPassword = watch('password')
    const watchConfirmPassord = watch('confirmPassword')
    const [showPassword, setShowPassword] = useState(false)
    const [formState, setFormState] = useState({ error: '', loading: false })


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { email, password, confirmPassword, role } = data

        setFormState({ loading: true, error: '' })

        if (password !== confirmPassword) {
            setFormState({ loading: false, error: 'Ocurrió un error inesperado' })
            return
        }

        const response = await registerUser(email, password, role)

        if (!response.ok) {
            console.error(response.message)
            setFormState({ loading: false, error: 'Ocurrió un error inesperado' })
            return
        }


        await login(email, password)

        router.push('/admin')
    }

    return (
        <>
            <h1 className="text-2xl text-green-700 mb-4">Crea una cuenta</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                    ¿Qué deseas hacer?
                    <select  defaultValue={""} {...register('role', { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700">
                        <option value=""disabled>Selecciona una opción</option>
                        <option value="admin">Crear mi negocio</option>
                        <option value="employee">Vincularme a un negocio</option>
                    </select>
                </label>
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
                {formState.error ? <p className="text-red-500">{formState.error}</p>
                    : watchPassword !== watchConfirmPassord && isValid && <p className="text-red-500">Las contraseñas no son iguales</p>}
                <button className={
                    clsx(
                        "btn-primary rounded-md font-bold flex justify-center py-2",
                        {
                            "opacity-50 pointer-events-none": watchPassword !== watchConfirmPassord || formState.loading || !isValid
                        }
                    )
                }>
                    {formState.loading ? <CgSpinner className="text-white animate-spin text-2xl" /> : 'Registrarte'}
                </button>
                <Link href="/admin/auth/login" className="text-green-700 text-center">¿Ya tienes una cuenta?</Link>
            </form>
        </>
    )
}

