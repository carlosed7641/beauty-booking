'use client'

import { useEffect, useState } from 'react'
import { useModal, useService } from '@/store'
import { ErrorBooking, LoginForm, Modal, ServiceList, SucessBooking } from '@/components'
import { BookingServiceModal } from '../..'
import { upsertEvent } from '@/actions'

interface Props {
    serviceList: Service[],
    professionals?: ProfessionalSchedule[]
    professionalData?: {
        id: string
        name: string
        photo?: string
    }
    entity: {
        id: string
        numberId: number
    }
    userId?: string
}

export const ServiceListTab = ({ serviceList, professionals, professionalData, entity, userId }: Props) => {

    const [step, setStep] = useState(1)
    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)
    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)

    useEffect(() => {
        if (openModal) {
            setServiceState({
                ...serviceState,
                userId,
                ...(professionalData?.id && {
                    selectedProfessional: {
                        id: professionalData.id,
                        name: professionalData.name,
                        photo: professionalData.photo
                    }
                })
            })
        } else {
            setStep(1)
        }

    }, [openModal])

    const professionalsByService = professionals?.filter(({ services }) =>
        services.some(s => s.id === serviceState.selectedService?.serviceId)
    )

    const completeBooking = async (userId?: string) => {

        const currentProfessionalService = professionals
            ?.find(p => p.id === serviceState.selectedProfessional?.id)
            ?.services.find(s => s.id === serviceState.selectedService?.serviceId) ?? serviceState?.selectedService

        try {
            await upsertEvent(
                {
                    ...serviceState,
                    userId,
                    price: currentProfessionalService?.price!,
                    durationHours: currentProfessionalService?.duration.hours!,
                    durationMinutes: currentProfessionalService?.duration.minutes!,
                    entityId: entity.id,
                }
            )
            setOpenModal('SuccessBooking')
        } catch {
            setOpenModal('ErrorBooking')
        }
    }


    return (
        <>
            <ServiceList
                serviceList={serviceList}
            />
            {openModal === 'ServiceList' && serviceState.selectedService &&
                <BookingServiceModal
                    setStep={setStep}
                    step={step}
                    professionals={professionalsByService}
                    entityId={entity.id}
                    isProfessionalView={professionalData?.id ? true : false}
                />
            }
            {
                openModal === 'ServiceGuard' &&
                <Modal className="sm:w-112.5! overflow-hidden!">
                    <div className="pt-6">
                        <LoginForm callback={completeBooking} />
                    </div>
                </Modal>
            }
            {
                openModal === 'SuccessBooking' &&
                <SucessBooking />
            }
            {
                openModal === 'ErrorBooking' && 
                <ErrorBooking />
            }   

        </>
    )
}