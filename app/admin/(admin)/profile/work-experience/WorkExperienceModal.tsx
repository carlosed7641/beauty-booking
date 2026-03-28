'use client'

import { useEffect } from 'react'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { WorkExperienceForm } from './WorkExperienceForm'
import { useFormContext } from 'react-hook-form'

const initialForm = {
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    city: ''
}

export const WorkExperienceModal = ({ modalId }: { modalId: string }) => {

    const openModal = useModal(state => state.openModal)
    const { reset } = useFormContext()

    useEffect(() => {
        if (!openModal) {
            reset(initialForm)
        }
    }, [openModal])


    return (
        typeof openModal === 'string' && openModal.includes(modalId) &&
        <Modal>
            <ModalHeader>
                <h1 className="text-xl text-green-700">
                    {openModal === modalId + 'Add' ? 'Agregar ' : 'Editar '} experiencia laboral
                </h1>
            </ModalHeader>
            <WorkExperienceForm />
        </Modal>

    )
}
