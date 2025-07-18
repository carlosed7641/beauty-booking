'use client'

import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useSteps } from '../../store'
import { Stepper, StepButtons } from '..'
import { StepFive, StepFour, StepOne, StepThree, StepTwo } from '.'

const steps = [
  {
    title: 'Información de negocio',
    subtitle: 'Esta es la información básica del negocio todos los campos son obligatorios',
    content: <StepOne />
  },
  {
    title: 'Elige los servicios que ofreces',
    subtitle: 'Más adelante puedes crear más',
    content: <StepTwo />
  },
    {
    title: 'Elige los servicios que ofreces',
    subtitle: 'Más adelante puedes crear más',
    content: <StepThree />
  },
]

export const RegistrationSteps = () => {

  const [isLoading, setIsLoading] = useState(true)
  const { step } = useSteps()
  const { title, subtitle, content } = steps[step]

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    isLoading ?
      <div className="h-screen flex justify-center items-center">
        <AiOutlineLoading3Quarters size={50} className="text-green-700 animate-spin" />
      </div>
      :
      <div className="bg-zinc-100">
        <div className="min-h-screen max-w-[1200px] my-0 mx-auto">
          <Stepper />
          <div className="flex flex-col gap-3 px-2">
            <h2 className="text-xl text-green-700 text-center">{title}</h2>
            <p className="text-center ">{subtitle}</p>
            <div className="bg-white w-full rounded-md p-7">
              {content}
            </div>
          </div>
          <StepButtons stepQuantity={steps.length} />
        </div>
      </div>
  )
}
