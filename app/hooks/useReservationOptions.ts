import { useModal, useService } from '@/store'

export const useReservationOptions = () => {

    const { setOpenModal } = useModal()
    const { setServiceState } = useService()

    const handleUpdate = (reservation: EventDate) => {
        setOpenModal('Reservation:Update')
        const r: ServiceState = {
            id: reservation.id,
            selectedService: reservation.selectedService,
            selectedProfessional: reservation.selectedProfessional,
            selectedDate: reservation.start,
            selectedHour: reservation.start.getHours().toString(),
            customer: {
                id: reservation.customer.id,
                name: reservation.customer.name,
                phone: reservation.customer.phone.number
            }
        }

        setServiceState(r)
    }

    const handleCancel = (id: string) => {
        // SetRemove(id)
        setOpenModal('Reservation:Cancel')
    }

    return {
        handleUpdate,
        handleCancel
    }

}