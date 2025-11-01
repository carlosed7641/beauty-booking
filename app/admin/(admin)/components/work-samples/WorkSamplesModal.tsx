'use client'

import { useState } from 'react'
import { TbPhotoUp } from 'react-icons/tb'
import { Modal, ModalHeader } from '@/components'
import { WorkSamplesForm } from './WorkSamplesForm'
import { WorkSamplesList } from './WorkSamplesList'
import { INITAL_WS_FORM_DATA } from '@/util/const'

export const WorkSamplesModal = ({ workSamples }: { workSamples: WorkSample[] }) => {

    const [formData, setFormData] = useState(INITAL_WS_FORM_DATA)
    const [showForm, setShowForm] = useState<string | boolean | null>(false)

    return (
        <Modal>
            <ModalHeader>
                <div className="flex gap-2 items-center text-xl text-green-700">
                    <TbPhotoUp className="text-2xl" />
                    Muestras de trabajo
                </div>
            </ModalHeader>
            {
                showForm ?
                    <WorkSamplesForm
                        formData={formData}
                        setFormData={setFormData}
                        setShowForm={setShowForm}
                    />
                    :
                    <WorkSamplesList
                        workSamples={workSamples}
                        setFormData={setFormData}
                        setShowForm={setShowForm}
                    />
            }
        </Modal>
    )
}
