'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CgSpinner } from 'react-icons/cg'
import { useRouter, useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { login, registerUser } from '@/actions'

interface Inputs {
    email: string
    password: string
    confirmPassword: string
}

export const NewAccountForm = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirectTo')
    const { register, handleSubmit, watch, formState: { isValid } } = useForm<Inputs>()
    const [showPassword, setShowPassword] = useState(false)
    const [formState, setFormState] = useState({ error: '', loading: false })
    const watchPassword = watch('password')
    const watchConfirmPassord = watch('confirmPassword')

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const { email, password, confirmPassword } = data

        setFormState({ loading: true, error: '' })

        if (password !== confirmPassword) {
            setFormState({ loading: false, error: 'Ocurrió un error inesperado' })
            return
        }

        const response = await registerUser(email, password, 'user')

        if (!response.ok) {
            console.error(response.message)
            setFormState({ loading: false, error: 'Ocurrió un error inesperado' })
            return
        }


        await login(email, password)

        router.push(redirectTo ?? '/')
    }


    return (
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
            <Link href="/auth/login" className="text-green-700 text-center">¿Ya tienes una cuenta?</Link>
        </form>
    )
}
