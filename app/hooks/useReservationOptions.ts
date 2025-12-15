import { useModal, useService } from '@/store'

export const useReservationOptions = () => {

    const { setOpenModal } = useModal()
    const { setServiceState } = useService()

    const handleUpdate = (reservation: EventDate) => {

        const hours = String(reservation.start.getHours()).padStart(2, '0')
        const minutes = String(reservation.start.getMinutes()).padStart(2, '0')

        const selectedHour = `${hours}:${minutes}`

        setOpenModal('Reservation:Update')
        const r: ServiceState = {
            id: reservation.id,
            selectedService: reservation.selectedService,
            selectedProfessional: reservation.selectedProfessional,
            selectedDate: reservation.start,
            selectedHour,
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