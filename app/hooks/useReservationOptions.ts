import { useModal, useService } from '@/store'

export const useReservationOptions = () => {

    const setOpenModal = useModal(state => state.setOpenModal)
    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)

    const handleUpdate = (reservation: EventDate, userId?: string) => {

        const hours = String(reservation.start.getHours()).padStart(2, '0')
        const minutes = String(reservation.start.getMinutes()).padStart(2, '0')

        const selectedHour = `${hours}:${minutes}`

        const r: ServiceState = {
            id: reservation.id,
            selectedService: reservation.selectedService,
            selectedProfessional: reservation.selectedProfessional,
            selectedDate: reservation.start,
            selectedHour,
            entityId: reservation.entity?.id,
            customer: {
                id: reservation.customer.id,
                name: reservation.customer.name,
            },
            userId
        }

        setServiceState(r)
        setOpenModal('Reservation:Update')
    }

    const handleCancel = (id: string, professionalId: string) => {
        setServiceState({
            ...serviceState,
            id,
            selectedProfessional: {
                ...serviceState.selectedProfessional!,
                id: professionalId
            }
        })
        setOpenModal('Reservation:Cancel')
    }

    return {
        handleUpdate,
        handleCancel
    }

}