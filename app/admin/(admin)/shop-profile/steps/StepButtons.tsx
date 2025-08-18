import { useProfileSteps } from '../../store'

interface Props {
    stepsLength: number
    handleFinish: () => void
}

export const StepButtons = ({ stepsLength, handleFinish }: Props) => {

    const { step, setStep, data, setShowErrors } = useProfileSteps()

    const handleClick = (value: number) => {

        if (step === 1 && !data.name || !data.types.length) {
            setShowErrors(true)
            return
        }

        if (step == 2 && !data.address) {
            setShowErrors(true)
            return
        }

        setShowErrors(false)
        setStep(value)
    }

    return (
        <div className="flex w-full gap-2 justify-end">
            {
                step > 0 &&
                <button
                    onClick={() => handleClick(step - 1)}
                    className="bg-white font-bold border border-green-700 p-1 rounded-full justify-center flex text-green-700 cursor-pointer w-full md:w-36 disabled:opacity-60 disabled:pointer-events-none focus:outline-0">
                    Anterior
                </button>
            }
            {
                step < stepsLength - 1 &&
                <button
                    onClick={() => handleClick(step + 1)}
                    className="bg-green-700 font-bold p-1 rounded-full justify-center flex text-white cursor-pointer hover:bg-green-800 w-full md:w-36 disabled:opacity-60 disabled:pointer-events-none focus:outline-0">
                    Siguiente
                </button>
            }
            {
                step === stepsLength - 1 &&
                <button
                    onClick={handleFinish}
                    className="bg-green-700 font-bold p-1 rounded-full justify-center flex text-white cursor-pointer hover:bg-green-800 w-full md:w-36 disabled:opacity-60 disabled:pointer-events-none focus:outline-0">
                    Finalizar
                </button>
            }
        </div>
    )
}
