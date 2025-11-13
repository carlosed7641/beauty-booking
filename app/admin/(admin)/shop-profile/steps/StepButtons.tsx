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
                    className="btn-secondary font-boldrounded-full justify-center flex w-full md:w-36">
                    Anterior
                </button>
            }
            {
                step < stepsLength - 1 &&
                <button
                    onClick={() => handleClick(step + 1)}
                    className="btn-primary font-bold rounded-full justify-center flex w-full md:w-36">
                    Siguiente
                </button>
            }
            {
                step === stepsLength - 1 &&
                <button
                    onClick={handleFinish}
                    className="btn-primary font-bold rounded-full justify-center flex w-full md:w-36">
                    Finalizar
                </button>
            }
        </div>
    )
}
