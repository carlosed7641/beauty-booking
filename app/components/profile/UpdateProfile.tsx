'use client'

import { useMemo, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useModal } from '@/store'
import { Modal, ModalHeader, ProfileForm } from '@/components'
import { updateUser } from '@/actions'
import { UserDTO } from '@/interfaces/user.interface'

export const UpdateProfile = ({ userData }: { userData: UserDTO }) => {

    const [profileFormState, setProfileFormState] = useState({ loading: false, error: '' })

    const initialValues = useMemo<UserDTO>(() => ({
        artisticName: userData.artisticName,
        birthDay: userData.birthDay,
        countryId: userData.countryId,
        description: userData.description,
        experienceArea: userData.experienceArea,
        experienceYears: userData.experienceYears,
        gender: userData.gender,
        indicator: userData.indicator,
        name: userData.name,
        phone: userData.phone,
        role: userData.role,
    }), [userData])

    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)

    const onSubmit = async (data: UserDTO) => {

        setProfileFormState({ loading: true, error: ''})
        
        const userData = {
            ...data,
            birthDay: new Date(`${data.birthDay}T00:00:00`)
        } as UserDTO

        for (const [key, value] of Object.entries(userData)) {

            userData[key as keyof UserDTO] = typeof value === 'string' && value.trim() === ''
                ? null
                : value
        }

        const { ok } = await updateUser(userData)

        if (!ok) {
            setProfileFormState({ loading: false, error: 'Ocurrió un error inesperado'})
            return
        }

        setProfileFormState({ loading: false, error: ''})
        setOpenModal('SuccessUpdate')
    }

    return (
        <>
            <button onClick={() => setOpenModal('UpdateProfile')} className="text-green-700 w-fit flex gap-1 items-center cursor-pointer font-bold underline mx-auto md:mx-0">
                <FaEdit />
                Editar perfil
            </button>
            {
                openModal === 'UpdateProfile' &&
                <Modal>
                    <ModalHeader>
                        <p className="text-green-700 text-lg">Editar datos del perfil</p>
                    </ModalHeader>
                    <ProfileForm
                        initialValues={initialValues}
                        isLoading={profileFormState.loading}
                        error={profileFormState.error}
                        onSubmit={onSubmit}
                    />
                </Modal>
            }
            {
                openModal === 'SuccessUpdate'  && 
                <Modal className="overflow-hidden! w-87.5!">
                    <ModalHeader>
                        <p className="text-green-700 text-lg">Actualización</p>
                    </ModalHeader>
                    <span>Registro actualizado correctamente</span>
                </Modal>
            }
        </>
    )
}