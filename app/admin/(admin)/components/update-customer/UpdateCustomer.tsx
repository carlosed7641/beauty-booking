'use client'

import { useState } from 'react'
import { useModal } from '@/store'
import { Modal, ModalHeader, ProfileForm } from '@/components'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { UserDTO } from '@/interfaces/user.interface'
import { createCustomer } from '@/actions'

export const UpdateCustomer = ({ entityId }: { entityId: string }) => {

    const setOpenModal = useModal(state => state.setOpenModal)
    const [customerFormState, setCustomerFormState] = useState({ loading: false, error: '' })

    const onSubmitCustomer = async (data: UserDTO) => {

        setCustomerFormState({ error: '', loading: true })

        const parsedData = {
            birthDay: data.birthDay && new Date(data.birthDay),
            gender: data.gender,
            indicator: data.indicator,
            name: data.name,
            phone: data.phone,
            entityId
        }

        try {
            await createCustomer(parsedData)
            setCustomerFormState({ error: '', loading: false })
            setOpenModal('ScheduleAssing')
        } catch {
            setCustomerFormState({ error: 'Ocurrió un error al guardar cliente', loading: false })
        }



    }

    return (
        <Modal className="md:w-175! md:overflow-hidden!">
            <ModalHeader>
                <h1 className="text-green-700 font-bold flex items-center gap-2">
                    <IoMdArrowRoundBack className="cursor-pointer text-xl" onClick={() => setOpenModal('ScheduleAssing')} />
                    Editor de clientes
                </h1>
            </ModalHeader>
            <ProfileForm
                isLoading={customerFormState.loading}
                error={customerFormState.error}
                onSubmit={onSubmitCustomer}
            />
        </Modal>
    )
}
