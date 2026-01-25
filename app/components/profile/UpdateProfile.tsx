'use client'

import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useModal } from '@/store'
import { Modal, ModalHeader, ProfileForm } from '@/components'
import { updateUser } from '@/actions'
import { UserDTO, UserWithEntity } from '@/interfaces/user.interface'

export const UpdateProfile = ({ userData, countries }: { userData: UserWithEntity, countries: Country[] }) => {

    const [profileFormState, setProfileFormState] = useState({ loading: false, error: '' })

    const initialValues: UserDTO = {
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
    }

    const { openModal, setOpenModal } = useModal()

    const onSubmit = async (data: UserDTO) => {

        setProfileFormState({ loading: true, error: ''})
        
        const userData = {
            ...data,
            birthDay: new Date(data.birthDay as Date)
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
                        isLoading={profileFormState.loading}
                        error={profileFormState.error}
                        countries={countries}
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