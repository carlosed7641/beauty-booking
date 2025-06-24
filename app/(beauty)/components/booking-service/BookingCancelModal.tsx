import { Modal, ModalHeader } from '@/components'

interface Props {
    setShowModal: (showModal: boolean) => void
}

export const BookingCancelModal = ({ setShowModal }: Props) => {
    return (
        <Modal setShowModal={setShowModal}>
            <ModalHeader setShowModal={setShowModal}>
                <h2 className="text-xl">¿Estás seguro que deseas cancelar la reserva?</h2>
            </ModalHeader>
            <div className="flex gap-4">
                <button onClick={() => { }} className="px-5 py-1 bg-green-700 text-white rounded-sm cursor-pointer hover:bg-green-800">Sí, cancelar</button>
                <button onClick={() => setShowModal(false)} className="px-5 py-1 text-green-700 border-green-700 border rounded-sm cursor-pointer">No, cerrar</button>
            </div>
        </Modal>
    )
}
