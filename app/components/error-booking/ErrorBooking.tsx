'use client'

import { MdOutlineError } from 'react-icons/md'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '../ui/modal'

export const ErrorBooking = () => {

    const setOpenModal = useModal(state => state.setOpenModal)

    return (
        <Modal className="md:max-w-120 overflow-hidden!">
            <ModalHeader>
                <div className="flex gap-2 text-xl items-center text-red-700">
                    <MdOutlineError className="text-red-500" />
                    Tu reserva no ha sido exitosa
                </div>
            </ModalHeader>
            <div className="flex flex-col gap-3 items-center">
                <span>Ocurrió un error, inténtalo más tarde</span>
                <button onClick={() => setOpenModal(null)} className="btn-primary rounded-full">Cerrar</button>
            </div>
        </Modal>
    )
}
