'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { FaCheck } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg'
import { useSteps } from '../../store'
import { completeRegistration } from '@/actions'

export const StepButtons = ({ stepQuantity, entityId }: { stepQuantity: number, entityId: string }) => {
    const { step, setStep, setShowErrors, completedSteps, setCompletedSteps, data, showErrors } = useSteps()
    const [isLoading, setIsLoading] = useState(false)

    const nextStep = () => {
        const next = step + 1
        setCompletedSteps(completedSteps > step ? completedSteps : next)
        setStep(next)
        setShowErrors(false)
    }

    const steps = [
        { isValid: () => [data.name, data.address, data.types.length > 0].every(Boolean) },
        { isValid: () => Boolean(data.selectedServices) },
        { isValid: () => Boolean(data.selectedServices) },
        { isValid: () => Boolean(data.selectedServices) },
        { isValid: () => data.workdays.every(day => !day.error) }
    ]

    const handleChangeStep = (value: number) => {
        if (value === -1 && step > 0) {
            return setStep(step - 1)
        }

        if (value === 1) {
            const currentStep = steps[step]
            if (!currentStep) return

            if (currentStep.isValid()) nextStep()
            else setShowErrors(true)
        }
    }

    const handleSaveData = async () => {
        setShowErrors(false)
        const allStepsValid = steps.every(step => step.isValid())
        if (allStepsValid) {
            setIsLoading(true)
            try {

                await completeRegistration({
                    entityId,
                    entity: {
                        name: data.name!,
                        address: data.address!,
                        reference: data.reference!,
                        types: data.types
                    },
                    services: data.selectedServices!,
                    workdays: data.workdays
                })

                localStorage.removeItem('steps-data')
                localStorage.removeItem('service-list')

                window.location.reload()

            } catch (e) {
                console.error(e)
            } finally {
                setIsLoading(false)
            }
            return
        }
        setShowErrors(true)
    }

    return (
        <div className="bg-white md:bg-transparent w-full md:w-auto py-4 md:py-0 sticky md:relative border-t md:border-none border-zinc-300 bottom-0 md:bottom-auto md:px-2 mt-8">
            {
                showErrors && step === 1 && !data.selectedServices &&
                <div className="md:hidden text-red-500 text-center mb-3">
                    Debes elegir mínimo un servicio
                </div>
            }
            {
                showErrors && step === stepQuantity - 1 &&
                <div className="md:hidden text-red-500 text-center mb-3">
                    Arregla los errores antes de continuar
                </div>
            }
            <div className="flex justify-center gap-3 md:justify-end">
                {
                    step > 0 && !isLoading &&
                    <button onClick={() => handleChangeStep(-1)} className="flex gap-2 items-center border border-green-700 text-green-700 rounded-full px-5 cursor-pointer">
                        <FaArrowLeftLong />
                        Anterior
                    </button>
                }
                {
                    step !== stepQuantity - 1 && !isLoading &&
                    <button onClick={() => handleChangeStep(1)} className="flex gap-2 items-center border bg-green-700 text-white border-green-700 rounded-full px-5 cursor-pointer">
                        Siguiente
                        <FaArrowRightLong />
                    </button>
                }
                {
                    step === stepQuantity - 1 &&
                    <button disabled={isLoading} onClick={() => handleSaveData()}
                        className={
                            clsx(
                                "flex w-31.5 justify-center gap-2 items-center border bg-green-700 text-white border-green-700 hover:bg-green-800 rounded-full px-5 cursor-pointer",
                                { "opacity-50": isLoading }
                            )
                        }>
                        {isLoading ? <CgSpinner className="text-white animate-spin text-xl" /> 
                            : <>
                                Finalizar
                                <FaCheck />
                            </>}

                    </button>
                }
            </div>
        </div>

    )
}