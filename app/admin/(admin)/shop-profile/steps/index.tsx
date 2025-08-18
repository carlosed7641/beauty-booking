'use client'

import { useState } from 'react'
import { LiaSave } from 'react-icons/lia'
import { useProfileSteps } from '../../store'
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'
import { StepThree } from './StepThree'
import { StepButtons } from './StepButtons'
import { Stepper } from './Stepper'

const steps = [
    {
        component: StepOne,
        title: 'Fotos principales'
    },
    {
        component: StepTwo,
        title: ' Información básica'
    },
    {
        component: StepThree,
        title: 'Dirección'
    }
]

export const Steps = () => {

    const [showError, setShowError] = useState(false)
    const { step, data } = useProfileSteps()
    const { title, component: Step } = steps[step]

    const handleSave = () => {
        if (!data.name || !data.types.length || !data.address) return setShowError(true)

        setShowError(false)
        console.log(data)
    }

    return (
        <>
            <Stepper title={title} stepsLength={steps.length} />
            <div className="relative">
                <Step />
                <div className="flex justify-between items-center mt-5 w-full">
                    {
                        step < steps.length - 1 &&
                        <button onClick={handleSave} className="cursor-pointer shrink-0 fixed top-1/2 right-5 md:top-auto md:right-auto md:relative h-12 w-12 bg-green-700 text-white rounded-full shadow-md flex justify-center items-center text-2xl hover:bg-green-800">
                            <LiaSave />
                        </button>
                    }
                    <StepButtons stepsLength={steps.length} handleFinish={handleSave} />
                </div>
                {showError && <span className="text-red-500 block mt-3">Verifica el formulario y completa los campos con *</span>}
            </div>
        </>
    )
}
