'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { CgSpinner } from 'react-icons/cg'
import { createEntity, updateUser } from '@/actions'
import { RegistrationSteps } from '..'
import { FLAGS } from '@/util/const'

export const SelectCountry = ({ countries }: { countries: Country[] }) => {

    const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null)
    const [showSteps, setShowSteps] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [entityId, setEntityId] = useState('')

    const handleSubmit = async () => {
        if (!selectedCountryId) return
        setIsLoading(true)

        try {
            const { id } = await createEntity(selectedCountryId)
            setEntityId(id)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }

        setShowSteps(true)
    }

    return (
        <>
            {
                showSteps ? <RegistrationSteps entityId={entityId} /> :
                    <div className="bg-[#eaf1eb] flex justify-center pt-24 md:items-center px-4 md:pt-0 h-screen">
                        <div className="bg-white p-5 rounded-md shadow-md h-fit">
                            <h1 className="text-green-700 text-2xl text-center mb-5">Selecciona el país donde tienes tu negocio</h1>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
                                {countries.map(({ id, name, shortName }) => {

                                    const Flag = FLAGS[shortName]

                                    return (
                                        <div onClick={() => setSelectedCountryId(id)} className={
                                            clsx(
                                                "group flex flex-col gap-2 p-2 hover:scale-110 cursor-pointer",
                                                {
                                                    "scale-110": selectedCountryId === id
                                                }
                                            )
                                        } key={id}>
                                            <Flag />
                                            <span className={
                                                clsx(
                                                    "text-center font-bold group-hover:text-green-700",
                                                    {
                                                        "text-green-700": selectedCountryId === id
                                                    }
                                                )
                                            }>{name}</span>
                                        </div>
                                    )
                                    }
                                )}
                            </div>
                            <div className="flex justify-center mt-5">
                                <button onClick={handleSubmit} className={
                                    clsx(
                                        "btn-primary w-full md:w-1/5 rounded-md font-bold",
                                        {
                                            "opacity-50": isLoading
                                        }
                                    )
                                } disabled={!selectedCountryId}>
                                    {isLoading ?  <CgSpinner className="text-white animate-spin text-2xl" /> : 'Continuar'}
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}