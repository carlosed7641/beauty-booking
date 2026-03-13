import { useService } from '@/store'

export const BookingButton = ({ setStep }: { setStep: (step: number) => void }) => {

    const serviceState = useService(state => state.serviceState)

    return (
        <button onClick={() => setStep(2)}
            className="btn-primary self-center rounded-md font-bold py-1 transition-all disabled:opacity-60 my-3" disabled={!serviceState.selectedProfessional || !serviceState.selectedDate || !serviceState.selectedHour}>
            {serviceState.id ? 'Modificar cita' : 'Agendar cita'}
        </button>
    )
}