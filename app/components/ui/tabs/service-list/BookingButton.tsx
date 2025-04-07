import { useService } from '@/store'

export const BookingButton = ({ setShowModal }: { setShowModal: (showModal: boolean) => void }) => {

    const { serviceState } = useService()

    const handleCompleteBooking = () => {
        console.log(serviceState)
        setShowModal(false)
    }

    return (
        <button onClick={handleCompleteBooking}
            className="w-fit px-5 self-center cursor-pointer rounded-md bg-green-700 hover:bg-green-900 text-white  
        font-bold py-1 transition-all disabled:opacity-60 disabled:pointer-events-none my-3" disabled={!serviceState.isCompleted}>
            Agendar cita
        </button>
    )
}
