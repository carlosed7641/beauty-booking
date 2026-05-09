'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { login } from '@/actions'
import clsx from 'clsx'
import { CgSpinner } from 'react-icons/cg'

interface Inputs {
    email: string
    password: string
}

interface Props {
    callback?: (id?: string, arr?: string[]) => Promise<void>
    isAdmin?: boolean
} 

export const LoginForm = ({ isAdmin = false, callback }: Props) => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirectTo')
    const { handleSubmit, register } = useForm<Inputs>()
    const [showPassword, setShowPassword] = useState(false)
    const [formState, setFormState] = useState({ error: '', loading: false })


    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setFormState({ loading: true, error: '' })
        const response = await login(data.email, data.password)

        if (!response.ok) {
            console.error(response.message)
            setFormState({ loading: false, error: 'Usuario o contraseña incorrecto' })
            return
        }

        if (callback) {
            router.refresh()
            callback(response.data?.id, response.data?.following) 
            return
        }

        router.push(isAdmin ? '/admin' : redirectTo ?? '/')
    }

    const newAccountUrl = isAdmin ? '/admin/auth/new-account' : '/auth/new-account'

    return (
        <>
            {isAdmin && <h1 className="text-2xl text-green-700 mb-4">¡Bienvenido de vuelta!</h1>}
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
                    <input className="w-3.5 h-3.5" type="checkbox" onChange={() => setShowPassword(!showPassword)} />
                    Mostrar contraseña
                </label>
                <button type="submit" className={
                    clsx(
                        "bg-green-700 text-white rounded-md py-2 font-bold cursor-pointer hover:bg-green-800 flex justify-center",
                        {
                            "opacity-50 pointer-events-none": formState.loading
                        }
                    )
                }>
                    {formState.loading ? <CgSpinner className="text-white animate-spin text-2xl" /> : 'Iniciar sesión'}
                </button>
                {formState.error && <p className="text-red-500">{formState.error}</p>}
                <hr className="text-zinc-300 my-2" />
                <Link href={newAccountUrl} className="bg-white text-green-700 rounded-md py-2 font-bold cursor-pointer border border-green-700 text-center">Crear una cuenta</Link>
            </form>
        </>
    )
}
