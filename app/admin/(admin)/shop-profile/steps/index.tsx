'use client'

import { useEffect, useState } from 'react'
import { LiaSave } from 'react-icons/lia'
import { useProfileSteps } from '../../store'
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'
import { StepThree } from './StepThree'
import { StepButtons } from './StepButtons'
import { Stepper } from './Stepper'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { CgSpinner } from 'react-icons/cg'
import { updateEntity } from '@/actions'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'

const steps = [
    {
        component: StepOne,
        title: 'Fotos principales'
    },
    {
        component: StepTwo,
        title: ' Información básica'
    },
    {
        component: StepThree,
        title: 'Dirección'
    }
]

interface Props {
    initialData: ShopProfile
    entityId: string
}

export const Steps = ({ initialData, entityId }: Props) => {

    const [error, setError] = useState('')
    const [isSaving, setIsSavig] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const data = useProfileSteps(state => state.data)
    const step = useProfileSteps(state => state.step)
    const setData = useProfileSteps(state => state.setData)

    const { title, component: Step } = steps[step]

    const handleSave = async () => {
        if (!data.name.trim() || !data.shopType.length || !data.address.trim()) return setError('Verifica el formulario y completa los campos con *')

        setError('')
        setIsSavig(true)

        const { images, ...values } = data

        const updatedData = {
            ...values,
            entityId,
            shopType: data.shopType.join(','),
            logo: images.logo,
            cover: images.cover
        }

        for (const [key, value] of Object.entries(updatedData)) {

            (updatedData as Record<string, any>)[key] = typeof value === 'string' && value.trim() === ''
                ? null
                : value
        }

        try {
            await updateEntity(updatedData)
            setOpenModal('UpdateSuccess')
        } catch {
            setError('Ocurrió un error, inténtelo más tarde')
        } finally {
            setIsSavig(false)
        }
    }

    useEffect(() => {
        setData(initialData)
        setIsLoading(false)
    }, [])

    return (
        <>
            {isLoading ?
                <div className="h-screen flex justify-center items-center">
                    <AiOutlineLoading3Quarters size={50} className="text-green-700 animate-spin" />
                </div>
                :
                <>
                    <Stepper title={title} stepsLength={steps.length} />
                    <div className="relative">
                        <Step />
                        <div className="flex justify-between items-center mt-5 w-full">
                            {
                                step < steps.length - 1 &&
                                <button disabled={isSaving} onClick={handleSave} className="cursor-pointer shrink-0 fixed top-1/2 right-5 md:top-auto md:right-auto md:relative h-12 w-12 bg-green-700 text-white rounded-full shadow-md flex justify-center items-center text-2xl hover:bg-green-800 disabled:opacity-55 disabled:pointer-events-none">
                                    {isSaving ? <CgSpinner className="animate-spin" /> : <LiaSave />}
                                </button>
                            }
                            <StepButtons stepsLength={steps.length} handleFinish={handleSave} isSaving={isSaving} />
                        </div>
                        {error && <span className="text-red-500 block mt-3">{error}</span>}
                    </div>
                </>
            }
            {
                openModal === 'UpdateSuccess' &&
                <Modal className="w-1/3! overflow-hidden!">
                    <ModalHeader>
                       <p className="text-green-700 font-bold">Actualización exitosa</p> 
                    </ModalHeader>
                    <p>Se actualizó correctamente</p>
                </Modal>
            }
        </>
    )
}
