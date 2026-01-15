'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiUserFocusThin } from 'react-icons/pi'
import { CgSpinner } from 'react-icons/cg'
import clsx from 'clsx'

interface Props {
    onSubmit(data: RegistrationInputs): void
    countries: Country[]
    isLoading: boolean
}

export const RegistrationForm = ({ onSubmit, countries, isLoading }: Props) => {

    const { register, handleSubmit, formState: { isValid } } = useForm<RegistrationInputs>()
    const [image, setImage] = useState('')

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return
        const url = URL.createObjectURL(e.target.files[0])
        console.log(url)
        setImage(url)
    }

    return (
        <div className="bg-[#eaf1eb] flex justify-center pt-24 md:items-center px-4 md:pt-0 h-screen">
            <div className="bg-white p-5 rounded-md shadow-md sm:w-100 w-full h-fit">
                <h1 className="text-2xl text-green-700 mb-4 text-center">Completa tu información</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1 justify-center items-center cursor-pointer">
                        {
                            image ?
                                <Image height={150} width={150} alt="Imagen" src={image} />
                                : <PiUserFocusThin className="text-green-700" size={180} />
                        }
                        <span>Toca para cambiar foto</span>
                        <input onChange={handleChangeImage} className="hidden" type="file" accept="image/png, image/jpeg, image/webp" />
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
                                countries.map(country => <option key={country.id} value={country.id}>{country.name}</option>)
                            }
                        </select>
                    </label>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Número de contacto</label>
                        <div className="flex gap-2">
                            <select className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" {...register('indicator', { required: true })}>
                                {countries.map(country => <option key={country.indicator} value={country.indicator}>+{country.indicator}</option>)}
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
