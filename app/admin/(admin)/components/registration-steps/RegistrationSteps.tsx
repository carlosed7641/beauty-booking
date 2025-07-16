'use client'

import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Stepper, StepButtons } from '..'
import { StepFive, StepFour, StepOne, StepThree, StepTwo } from '.'

const steps = [<StepOne />, <StepTwo />, <StepThree />, <StepFour />, <StepFive />]

export const RegistrationSteps = () => {

  const [isLoading, setIsLoading] = useState(true)

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
        <Stepper steps={steps} />
        <StepButtons stepQuantity={steps.length} />
      </div>
    </div>
  )
}
