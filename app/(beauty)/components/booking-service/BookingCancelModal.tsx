import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'

export const BookingCancelModal = () => {

    const { setOpenModal } = useModal()

    return (
        <Modal className="md:w-[550px]! overflow-hidden!">
            <ModalHeader>
                <h2 className="text-xl">¿Estás seguro que deseas cancelar la reserva?</h2>
            </ModalHeader>
            <div className="flex gap-4">
                <button onClick={() => { }} className=" btn-primary rounded-sm w-1/2">Sí, cancelar</button>
                <button onClick={() => setOpenModal(null)} className="btn-secondary rounded-sm w-1/2">No, cerrar</button>
            </div>
        </Modal>
    )
}
