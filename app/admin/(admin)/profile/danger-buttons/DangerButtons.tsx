'use client'

import { useState } from 'react'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { deleteUser, logout, unlinkEmployee } from '@/actions'

export const DangerButtons = ({ isOwner, userId }: { isOwner: boolean, userId: string }) => {

    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const [isLoading, setIsLoading] = useState(false)

    const handleAction = async () => {
        setIsLoading(true)
        try {
            if (openModal === 'DeleteAccount') {
                await deleteUser()
                await logout()
            } else {
                await unlinkEmployee(userId)
            }
        } catch {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="flex flex-col md:flex-row justify-center md:justify-end gap-3">
                {
                    !isOwner &&
                    <button onClick={() => setOpenModal('Unlink')} className="md:w-60 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-full cursor-pointer">
                        Desvincularse del negocio
                    </button>
                }
                <button onClick={() => setOpenModal('DeleteAccount')} className="md:w-60 py-2  bg-red-500 hover:bg-red-600 text-white font-bold rounded-full cursor-pointer">
                    Eliminar cuenta
                </button>
            </div>
            {
                (openModal === 'DeleteAccount' || openModal === 'Unlink') && (
                    <Modal className="max-w-96! overflow-hidden!">
                        <ModalHeader>
                            {openModal === 'DeleteAccount' ? 'Eliminar cuenta' : 'Desvincularme del negocio'}
                        </ModalHeader>
                        <p>{openModal === 'DeleteAccount' ? '¿Está seguro que desea eliminar su cuenta? Esto no es reversible' : '¿Está seguro que desea desvincular su cuenta de este negocio?'}</p>
                        {
                            isLoading ?
                                <p className="flex justify-center mt-2">Procesando...</p>
                                :
                                <div className="flex gap-2 w-full mt-2">
                                    <button onClick={handleAction} className="bg-red-500 hover:bg-red-600 text-white w-1/2 cursor-pointer rounded-md py-1.5">
                                        {openModal === 'DeleteAccount' ? 'Sí, eliminar' : 'Sí, desvincularme'}
                                    </button>
                                    <button onClick={() => setOpenModal(null)} className="bg-gray-500 hover:bg-gray-600 text-white w-1/2 cursor-pointer rounded-md py-1.5">Cancelar</button>
                                </div>
                        }
                    </Modal>
                )
            }
        </>
    )
}
