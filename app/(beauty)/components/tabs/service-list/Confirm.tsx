import { useModal, useService } from '@/store'
import { formatDate, formatNumber, formatTextHour } from '@/helpers';

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
                <span>Desde ${formatNumber(serviceState.selectedService?.price!)}</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-[100px]">Duración</p>
                {/* <span>{serviceState.selectedService?.duration} aprox</span> */}
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-[100px]">Fecha</p>
                <span>{formatDate({ date: serviceState.selectedDate!})}</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-[100px]">Hora</p>
                <span>{formatTextHour(serviceState.selectedHour!)}</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-[100px]">Profesional</p>
                <span>{serviceState.selectedProfessional?.name}</span>
            </div>
            <button onClick={handleConfirmBooking} className="btn-primary w-fit self-center font-bold my-3">Confirmar reserva</button>
        </div>
    )
}