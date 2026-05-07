'use client'

import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { RegistrationForm } from '..'
import { updateUser } from '@/actions'
import { SelectCountry } from '@/components'

interface Props {
    countries: Country[]
    isEmployee: boolean
}

export const RegistrationData = ({ countries, isEmployee }: Props) => {

    const [showCountryStep, setShowCountryStep] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
        setIsLoading(true)

        const newData = {
            ...data,
            ...(isEmployee && { isRegisterCompleted: true })
        }

        const response = await updateUser(newData)

        if (!response.ok) {
            setIsLoading(false)
            return
        } 

        if (isEmployee) {
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