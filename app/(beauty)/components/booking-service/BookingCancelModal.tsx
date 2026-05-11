'use client'

import { useState } from 'react'
import { useModal, useService } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { cancelEvent } from '@/actions'

export const BookingCancelModal = () => {

    const serviceState = useService(state => state.serviceState)
    const setOpenModal = useModal(state => state.setOpenModal)
    const [isLoading, setIsLoading] = useState(false)

    const hanleCancelEvent = async () => {
        setIsLoading(true)
        try {
            await cancelEvent(serviceState.id!, serviceState.selectedProfessional!.id)
            setOpenModal(null)
        }  finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal className="md:w-137.5! overflow-hidden!">
            <ModalHeader>
                <h2 className="text-xl">¿Estás seguro que deseas cancelar la reserva?</h2>
            </ModalHeader>
            {
                isLoading ?
                <p>Procesando...</p>
                :
                <div className="flex gap-4">
                <button onClick={hanleCancelEvent} className=" btn-primary rounded-sm w-1/2">Sí, cancelar</button>
                <button onClick={() => setOpenModal(null)} className="btn-secondary rounded-sm w-1/2">No, cerrar</button>
            </div>
            }
        </Modal>
    )
}
