import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { useSteps } from '../../store'

export const StepButtons = ({ stepQuantity }: { stepQuantity: number }) => {
    const { step, setStep, setShowErrors, completedSteps, setCompletedSteps, data } = useSteps()

    const nextStep = () => {
        const next = step + 1
        setCompletedSteps(completedSteps > step ? completedSteps : next)
        setStep(next)
        setShowErrors(false)
        //TODO: Save to BD
    }

    const steps = [
        { isValid: () => [data.stepOne.name, data.stepOne.address, data.stepOne.types.length > 0].every(Boolean) },
        { isValid: () => true }
    ]

    const handleChangeStep = (value: number) => {
        if (value === -1 && step > 0) {
            return setStep(step - 1)
        }

        if (value === 1) {
            const currentStep = steps[step]
            if (!currentStep) return

            if (currentStep.isValid()) {
                nextStep()
            } else {
                setShowErrors(true)
            }
        }
    }

    return (
        <div className="bg-white md:bg-transparent w-full md:w-auto py-4 md:py-0 sticky md:relative border-t md:border-none border-zinc-300 bottom-0 md:bottom-auto justify-center flex gap-3 mt-8 md:justify-end md:px-2">
            <div>Completed steps {completedSteps}</div>
            {
                step > 0 &&
                <button onClick={() => handleChangeStep(-1)} className="flex gap-2 items-center border border-green-700 text-green-700 rounded-full px-5 cursor-pointer">
                    <FaArrowLeftLong />
                    Anterior
                </button>
            }
            {
                step !== stepQuantity - 1 &&
                <button onClick={() => handleChangeStep(1)} className="flex gap-2 items-center border bg-green-700 text-white border-green-700 rounded-full px-5 cursor-pointer">
                    Siguiente
                    <FaArrowRightLong />
                </button>
            }
        </div>
    )
}