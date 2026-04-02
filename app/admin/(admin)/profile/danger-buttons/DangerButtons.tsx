'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { deleteUser, logout } from '@/actions'

export const DangerButtons = ({ isOwner }: { isOwner: boolean }) => {

    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const onDeleteUser = async () => {
        setIsLoading(true)
        try {
            await deleteUser()
            await logout()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="flex flex-col md:flex-row justify-center md:justify-end gap-3">
                {
                    !isOwner &&
                    <button className="md:w-60 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-full cursor-pointer">
                        Desvincularse del negocio
                    </button>
                }
                <button onClick={() => setOpenModal('DeleteAccount')} className="md:w-60 py-2  bg-red-500 hover:bg-red-600 text-white font-bold rounded-full cursor-pointer">
                    Eliminar cuenta
                </button>
            </div>
            {
                openModal === 'DeleteAccount' && (
                    <Modal className="max-w-96! overflow-hidden!">
                        <ModalHeader>
                            Eliminar cuenta
                        </ModalHeader>
                        <p>¿Está seguro que desea eliminar su cuenta? Esto no es reversible</p>
                        {
                            isLoading ?
                                <p className="flex justify-center mt-2">Procesando...</p>
                                :
                                <div className="flex gap-2 w-full mt-2">
                                    <button onClick={onDeleteUser} className="bg-red-500 hover:bg-red-600 text-white w-1/2 cursor-pointer rounded-md py-1.5">Sí, eliminar</button>
                                    <button onClick={() => setOpenModal(null)} className="bg-gray-500 hover:bg-gray-600 text-white w-1/2 cursor-pointer rounded-md py-1.5">Cancelar</button>
                                </div>
                        }
                    </Modal>
                )
            }
        </>
    )
}
