'use client'

import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { RegistrationForm, SelectCountry } from '..'

export const RegistrationData = () => {

    const [showCountryStep, setShowCountryStep] = useState(false)

    const onSubmit: SubmitHandler<RegistrationInputs> = (data) => {
        console.log(data)
        setShowCountryStep(true)
    }

    return (
        <>
            {showCountryStep ? <SelectCountry /> : <RegistrationForm onSubmit={onSubmit} />}
        </>
    )
}