import React from 'react'
import { PiCaretCircleRightFill } from 'react-icons/pi'
import { useProfileSteps } from '../../store'

export const Stepper = ({ title, stepsLength }: { title: string, stepsLength: number }) => {

    const step= useProfileSteps(state => state.step)
    const setStep = useProfileSteps(state => state.setStep)

    const calcProgressWidth = () => {
        const width = Math.ceil(((step + 1) / stepsLength) * 100)
        return `${width}%`
    }

    return (
        <>
            <div className="flex justify-between md:justify-center items-center mb-2 md:mb-4">
                <PiCaretCircleRightFill onClick={() => setStep(step - 1)} className="md:hidden text-3xl rotate-180 text-green-700 aria-disabled:opacity-60 aria-disabled:pointer-events-none" aria-disabled={step === 0} />
                <h2 className="text-green-700 font-bold text-lg flex gap-2 justify-center item">
                    <span className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-green-700">{step + 1}</span>
                    {title}
                </h2>
                <PiCaretCircleRightFill onClick={() => setStep(step + 1)} className="md:hidden text-3xl text-green-700 aria-disabled:opacity-60 aria-disabled:pointer-events-none" aria-disabled={step === stepsLength - 1} />
            </div>
            <div className="md:hidden bg-zinc-400 h-1.5 rounded-full w-full mb-4">
                <div style={{ width: calcProgressWidth() }} className="bg-green-700 h-full rounded-full transition-all"></div>
            </div>
        </>
    )
}
