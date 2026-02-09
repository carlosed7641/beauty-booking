import { useProfileSteps } from '../../store'

interface Props {
    stepsLength: number
    handleFinish: () => void
    isSaving: boolean
}

export const StepButtons = ({ stepsLength, handleFinish, isSaving }: Props) => {

    const step = useProfileSteps(s => s.step)
    const setStep = useProfileSteps(s => s.setStep)
    const data = useProfileSteps(s => s.data)
    const setShowErrors = useProfileSteps(s => s.setShowErrors)

    const handleClick = (value: number) => {

        if (step === 1 && (!data.name || !data.shopType.length)) {
            setShowErrors(true)
            return
        }

        if (step === 2 && !data.address) {
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
                    onClick={() => setStep(step - 1)}
                    className="btn-secondary font-bold rounded-full justify-center flex w-full md:w-36">
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
                    disabled={isSaving}
                    onClick={handleFinish}
                    className="btn-primary font-bold rounded-full justify-center flex w-full md:w-36 disabled:opacity-55 disabled:pointer-events-none">
                    { isSaving ? 'Procesando...' : 'Finalizar'}
                </button>
            }
        </div>
    )
}
