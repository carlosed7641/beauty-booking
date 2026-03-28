'use client'

import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { RegistrationForm, SelectCountry } from '..'
import { updateUser } from '@/actions'

export const RegistrationData = ({ countries }: { countries: Country[] }) => {

    const [showCountryStep, setShowCountryStep] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
        setIsLoading(true)
        const response = await updateUser(data)

        if (!response.ok) {
            setIsLoading(false)
            return
        } 

        setShowCountryStep(true)
    }

    return (
        <>
            {showCountryStep ? <SelectCountry countries={countries} /> : <RegistrationForm onSubmit={onSubmit} countries={countries} isLoading={isLoading}  />}
        </>
    )
}