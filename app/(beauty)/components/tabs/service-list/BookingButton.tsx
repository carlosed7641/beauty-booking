import { useService } from '@/store'

export const BookingButton = ({ setStep }: { setStep: (step: number) => void }) => {

    const { serviceState: { id, selectedProfessional, selectedDate, selectedHour } } = useService()

    return (
        <button onClick={() => setStep(2)}
            className="btn-primary self-center rounded-md font-bold py-1 transition-all disabled:opacity-60 my-3" disabled={!selectedProfessional || !selectedDate || !selectedHour}>
            {id ? 'Modificar cita' : 'Agendar cita'}
        </button>
    )
}