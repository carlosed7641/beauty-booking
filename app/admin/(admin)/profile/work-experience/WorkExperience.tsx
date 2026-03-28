'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { PiPlusCircleBold } from 'react-icons/pi'
import { useModal } from '@/store'
import { WorkExperienceItem, WorkExperienceModal } from '..'
import { Modal, ModalHeader } from '@/components'
import { deleteWorkExperience } from '@/actions'

export const WorkExperience = ({ workExperiences }: { workExperiences: WorkExperience[] }) => {

    const methods = useForm()
    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const [selectedId, setSelectedId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        setIsLoading(true)
        await deleteWorkExperience(selectedId)
        setSelectedId('')
        setOpenModal(null)
        setIsLoading(false)
    }

    return (
        <>
            <FormProvider {...methods}>
                <div className="bg-white w-full rounded-md p-7">
                    <div className="flex justify-between md:justify-start md:gap-3 items-center mb-3 text-green-700">
                        <span className="text-xl md:text-2xl">Experiencia laboral</span>
                        <PiPlusCircleBold onClick={() => setOpenModal(WorkExperience.name + 'Add')} className="text-2xl cursor-pointer" />
                    </div>
                    <div className="flex flex-col gap-3 mt-2">
                        {
                            workExperiences.length > 0 ?
                                <ul className="flex flex-col gap-3">
                                    {workExperiences.map(item =>
                                        <WorkExperienceItem
                                            setSelectedId={setSelectedId}
                                            key={item.id}
                                            modalId={WorkExperience.name}
                                            item={item}
                                        />
                                    )}
                                </ul>
                                :
                                <p>No hay nada acá aún</p>
                        }
                    </div>
                </div>
                <WorkExperienceModal modalId={WorkExperience.name} />
            </FormProvider>
            {
                openModal === 'DeleteWE' &&
                <Modal className="max-w-96! overflow-hidden!">
                    <ModalHeader>
                        Eliminar registro
                    </ModalHeader>
                    <p>¿Está seguro que desea eliminar este registro?</p>
                    {
                        isLoading ? 
                        <p className="flex justify-center mt-2">Procesando...</p>
                    :
                            <div className="flex gap-2 w-full mt-2">
                                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white w-1/2 cursor-pointer rounded-md">Sí, eliminar</button>
                                <button onClick={() => {
                                    setOpenModal(null)
                                    setSelectedId('')
                                }} className="bg-gray-500 hover:bg-gray-600 text-white w-1/2 cursor-pointer rounded-md">Cancelar</button>
                            </div>
                    }
                </Modal>
            }
        </>
    )
}
