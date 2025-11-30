'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { COUNTRIES } from '@/util/const'
import { RegistrationSteps } from '..'

export const SelectCountry = () => {

    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
    const [showSteps, setShowSteps] = useState(false)

    const handleSubmit = () => {
        console.log(selectedCountry)
        setShowSteps(true)
    }

    return (
        <>
            {
                showSteps ? <RegistrationSteps /> :
                    <div className="bg-[#eaf1eb] flex justify-center pt-24 md:items-center px-4 md:pt-0 h-screen">
                        <div className="bg-white p-5 rounded-md shadow-md h-fit">
                            <h1 className="text-green-700 text-2xl text-center mb-5">Selecciona el país donde tienes tu negocio</h1>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
                                {COUNTRIES.map(({ id, name, flag: Flag, indicator }) =>
                                    <div onClick={() => setSelectedCountry({  id, name, flag: Flag, indicator })} className={
                                        clsx(
                                            "group flex flex-col gap-2 p-2 hover:scale-110 cursor-pointer",
                                            {
                                                "scale-110": selectedCountry?.id === id
                                            }
                                        )
                                    } key={id}>
                                        <Flag />
                                        <span className={
                                            clsx(
                                                "text-center font-bold group-hover:text-green-700",
                                                {
                                                    "text-green-700": selectedCountry?.id === id
                                                }
                                            )
                                        }>{name}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center mt-5">
                                <button onClick={handleSubmit} className="btn-primary w-full md:w-1/5 rounded-md font-bold" disabled={!selectedCountry}>Enviar</button>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}