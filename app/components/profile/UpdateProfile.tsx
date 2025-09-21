'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { useModal } from '@/store'
import { Modal, ModalHeader, ProfileForm } from '@/components'
import { session } from '@/util/fake-data'

export const UpdateProfile = () => {

    const initialValues = {
        name: session.name,
        country: session.country,
        photo: session.photo,
        indicator: session.indicator,
        phone: session.phone,
        birthDay: session.birthDay,
        gender: session.gender,
        role: session.role
    }

    const { openModal, setOpenModal } = useModal()

    const onSubmit = (data: Omit<Session, "id" | "shareNumberPhone">) => {
        //TODO: Save to BD
        console.log(data)
        setOpenModal(null)
    }

    return (
        <>
            <button onClick={() => setOpenModal(UpdateProfile.name)} className="text-green-700 w-fit flex gap-1 items-center cursor-pointer font-bold underline">
                <FaEdit />
                Editar perfil
            </button>
            {
                openModal === UpdateProfile.name &&
                <Modal>
                    <ModalHeader>
                        <p className="text-green-700 text-lg">Editar datos del perfil</p>
                    </ModalHeader>
                    <ProfileForm
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    />
                </Modal>
            }
        </>
    )
}