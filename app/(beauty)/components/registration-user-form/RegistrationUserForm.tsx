'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CgSpinner } from 'react-icons/cg'
import clsx from 'clsx'
import { COUNTRIES, GENDERS } from '@/util/const'
import { Gender } from '@/generated/prisma/enums'
import { updateUser } from '@/actions'
interface Inputs {
    indicator?: string
    phone?: string
    name: string
    gender: Gender
    birthDay: Date | null
}

export const RegistrationUserForm = () => {

    const { register, handleSubmit, formState: { isValid } } = useForm<Inputs>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const onSubmit: SubmitHandler<Inputs> = async formData => {

        if (!isValid) return
        setIsLoading(true)

        try {
            
            const data = {
                ...formData,
                birthDay: formData.birthDay && new Date(`${formData.birthDay}T00:00:00`),
                indicator: formData.phone ? formData.indicator : null,
                isRegisterCompleted: true
            }

            await updateUser(data)
        } catch {
            setError(true)
        } finally {
            setIsLoading(false)
        }


    }

    return (
        <div className="flex justify-center pt-24 md:items-center px-4 md:pt-0 h-screen">
            <div className="bg-white p-5 rounded-md shadow-md sm:w-100 w-full h-fit">
                <h1 className="text-2xl text-green-700 mb-4 text-center">¡Completa tu perfil!</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Celular (opcional)</label>
                        <div className="flex gap-2">
                            <select className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" {...register('indicator')}>
                                {COUNTRIES.map(country => <option key={country.indicator} value={country.indicator}>+{country.indicator}</option>)}
                            </select>
                            <input id="phone" {...register('phone')} className="flex-1 p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="text" />
                        </div>
                    </div>
                    <label className="flex flex-col gap-2">
                        Nombre
                        <input {...register('name', { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="text" placeholder="Tu nombre" />
                    </label>
                    <label className="flex flex-col  gap-2">
                        Fecha de nacimiento
                        <input {...register("birthDay", { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="date" />
                    </label>
                    <label className="flex flex-col gap-2">
                        Género
                        <select {...register("gender", { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700">
                            {Object.entries(GENDERS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                        </select>
                    </label>

                    <button className={
                        clsx(
                            "bg-green-700 text-white rounded-md py-2 font-bold cursor-pointer hover:bg-green-800 flex justify-center",
                            {
                                "opacity-50 pointer-events-none": isLoading || !isValid
                            }
                        )
                    }>
                        {isLoading ? <CgSpinner className="text-white animate-spin text-2xl" /> : 'Continuar'}
                    </button>
                    { error && <span className="text-red-500">Ocurrió un error, inténtelo de nuevo</span> }
                </form>
            </div>
        </div>
    )

}
