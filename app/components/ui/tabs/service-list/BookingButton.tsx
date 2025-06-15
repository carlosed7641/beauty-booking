import { useService } from '@/store'

export const BookingButton = ({ setStep }: { setStep: (step: number) => void }) => {

    const { serviceState } = useService()

    return (
        <button onClick={()=> setStep(2)}
            className="w-fit px-5 self-center cursor-pointer rounded-md bg-green-700 hover:bg-green-900 text-white  
        font-bold py-1 transition-all disabled:opacity-60 disabled:pointer-events-none my-3" disabled={!serviceState.isCompleted}>
            { serviceState.id ? 'Modificar cita' : 'Agendar cita'}
        </button>
    )
}
