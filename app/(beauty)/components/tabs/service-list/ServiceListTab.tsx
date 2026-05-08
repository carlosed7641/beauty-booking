'use client'

import { useEffect, useState } from 'react'
import { useModal, useService } from '@/store'
import { LoginForm, Modal, ServiceList } from '@/components'
import { BookingServiceModal } from '../..'
import { professionals as allProfessionals } from '@/util/fake-data'
import { upsertEvent } from '@/actions'

interface Props {
    serviceList: Service[],
    professionals?: ProfessionalSchedule[]
    professionalData?: {
        id: string
        name: string
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

    useEffect(() => {
        if (openModal) {
            setServiceState({
                ...serviceState,
                userId,
                ...(professionalData?.id && {
                    selectedProfessional: {
                        id: professionalData.id,
                        name: professionalData.name
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
        try {
            const event = await upsertEvent(
                {
                    ...serviceState,
                    userId,
                    price,
                    durationHours: duration.hours,
                    durationMinutes: duration.minutes,
                    entityId,
                }
            )
            // setSucces()
        } catch {
            // setError(true)
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
    </>
)
}