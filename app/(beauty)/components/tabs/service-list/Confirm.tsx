import { useModal, useService } from '@/store'
import { format12 } from '../../../../helpers/generate-hours-array';

export const Confirm = () => {

    const { serviceState } = useService()
    const { setOpenModal } = useModal()

    const handleConfirmBooking = () => {
        console.log(serviceState)
        //TODO: Create ID here & validate if update o create
        setOpenModal(null)
    }

    return (
        <div className="flex flex-col">
            <div className="flex gap-5">
                <p className="text-green-700 w-[100px]">Servicio</p>
                <span>{serviceState.selectedService?.name}</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-[100px]">Valor</p>
                <span>Desde ${serviceState.selectedService?.price}</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-[100px]">Duración</p>
                <span>{serviceState.selectedService?.duration} aprox</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-[100px]">Fecha</p>
                <span>{serviceState.selectedDate?.toDateString()}</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-[100px]">Hora</p>
                <span>{serviceState.selectedHour}</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-[100px]">Profesional</p>
                <span>{serviceState.selectedProfessional}</span>
            </div>
            <button onClick={handleConfirmBooking} className="w-fit px-5 self-center cursor-pointer rounded-md bg-green-700 hover:bg-green-900 text-white  
    font-bold py-1 transition-all my-3">Confirmar reserva</button>
        </div>
    )
}