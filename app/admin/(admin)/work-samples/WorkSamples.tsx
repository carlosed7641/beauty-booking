'use client'

import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { WorkSamplesForm, WorkSamplesList } from '../components'
import { INITAL_WS_FORM_DATA } from '@/util/const'

export const WorkSample = ({ workSamples }: { workSamples: WorkSample[] }) => {

    const [formData, setFormData] = useState(INITAL_WS_FORM_DATA)
    const { openModal, setOpenModal } = useModal()

    useEffect(() => {
        if (!openModal) {
            setFormData(INITAL_WS_FORM_DATA)
        }
    }, [openModal])

    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Muestras de trabajo</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative flex flex-col">
                    <WorkSamplesList
                        workSamples={workSamples}
                        setShowForm={setOpenModal}
                        setFormData={setFormData}
                        hideButton
                    />
                    <button onClick={() => setOpenModal(true)} className="absolute bottom-10 right-10 xl:right-[calc(50%-600px+40px)] flex items-center gap-2 h-12 w-12 justify-center bg-green-700 rounded-full cursor-pointer hover:bg-green-800 text-white">
                        <FaPlus className="text-xl" />
                    </button>
                </div>
            </div>
            {
                openModal &&
                <Modal>
                    <ModalHeader>
                        <h3 className="text-green-700">
                            {formData.id ? 'Editar' : 'Agregar'} Muestra de trabajo
                        </h3>
                    </ModalHeader>
                    <WorkSamplesForm
                        formData={formData}
                        setFormData={setFormData}
                        setShowForm={setOpenModal}
                        hideHint
                    />
                </Modal>
            }
        </>
    )
}