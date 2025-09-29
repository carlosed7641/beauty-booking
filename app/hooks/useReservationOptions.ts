import { useModal, useService } from '@/store'

export const useReservationOptions = () => {

    const { setOpenModal } = useModal()
    const { setServiceState } = useService()

    const handleUpdate = (reservation: ServiceState) => {
        setOpenModal('Reservation:Update')
        setServiceState(reservation)
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