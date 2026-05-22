'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiUserFocusThin } from 'react-icons/pi'
import { CgSpinner } from 'react-icons/cg'
import clsx from 'clsx'
import { COUNTRIES } from '@/util/const'

interface Props {
    onSubmit(data: RegistrationInputs): void
    isLoading: boolean
}

export const RegistrationForm = ({ onSubmit, isLoading }: Props) => {

    const { register, handleSubmit, formState: { isValid }, watch } = useForm<RegistrationInputs>()
    const [tempPhoto, setTempPhoto] = useState('')

    const watchPhoto = watch('photo')

    useEffect(() => {
        if (!watchPhoto?.length) return
        const photo =  URL.createObjectURL(watchPhoto[0])
        setTempPhoto(photo)
    }, [watchPhoto])

    return (
        <div className="flex justify-center pt-24 md:items-center px-4 md:pt-0 h-screen">
            <div className="bg-white p-5 rounded-md shadow-md sm:w-100 w-full h-fit">
                <h1 className="text-2xl text-green-700 mb-4 text-center">Completa tu información</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1 justify-center items-center cursor-pointer">
                        {
                            tempPhoto ?
                                <Image className="w-37.5 h-37-5 object-contain" height={150} width={150} alt="Imagen" src={tempPhoto} />
                                : <PiUserFocusThin className="text-green-700" size={180} />
                        }
                        <span>Toca para cambiar foto</span>
                        <input {...register('photo')}  className="hidden" type="file" accept="image/png, image/jpeg, image/webp" />
                    </label>
                    <label className="flex flex-col gap-2">
                        Nombre
                        <input {...register('name', { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="text" placeholder="¿Cómo te conocen?" />
                    </label>
                    <label className="flex flex-col gap-2">
                        País
                        <select defaultValue="" className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" {...register('countryId', { required: true })}>
                            <option value="" disabled>-- Selecciona un país --</option>
                            {
                                COUNTRIES.map(country => <option key={country.id} value={country.id}>{country.name}</option>)
                            }
                        </select>
                    </label>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Número de contacto</label>
                        <div className="flex gap-2">
                            <select className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" {...register('indicator', { required: true })}>
                                {COUNTRIES.map(country => <option key={country.indicator} value={country.indicator}>+{country.indicator}</option>)}
                            </select>
                            <input id="phone" {...register('phone', { required: true })} className="flex-1 p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="text" />
                        </div>
                    </div>
                    <button className={
                        clsx(
                            "bg-green-700 text-white rounded-md py-2 font-bold cursor-pointer hover:bg-green-800 flex justify-center",
                            {
                                "opacity-50 pointer-events-none": isLoading || !isValid
                            }
                        )
                    }>
                        {isLoading ?  <CgSpinner className="text-white animate-spin text-2xl" /> : 'Continuar'}
                    </button>
                </form>
            </div>
        </div>
    )

}
