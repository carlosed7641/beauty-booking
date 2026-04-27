'use client'

import { useEffect, useState } from 'react'
import { useModal, useService } from '@/store'
import { ServiceList } from '@/components'
import { BookingServiceModal } from '../..'
import { professionals as allProfessionals } from '@/util/fake-data'

interface Props {
    serviceList: Service[],
    professionals?: ProfessionalSchedule[]
    professionalId?: string
    entity: {
        id: string
        numberId: number
    }
    isAuthenticated?: boolean
}

export const ServiceListTab = ({ serviceList, professionals, professionalId, entity, isAuthenticated }: Props) => {

    const [step, setStep] = useState(1)
    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)
    const openModal = useModal(state => state.openModal)
    
    useEffect(() => {
        if (openModal) {
            if (professionalId) {
                const professional = allProfessionals.find(p => p.id === professionalId)!

                if (professional) {
                    setServiceState({
                        ...serviceState,
                        selectedProfessional: {
                            id: professional.id,
                            name: professional.name
                        }
                    })
                }
            }
        } else {
            setStep(1)
        }

    }, [openModal])

    const professionalsByService = professionals?.filter(({ services }) =>
        services.some(s => s.id === serviceState.selectedService?.serviceId)
    )

    return (
        <>
            <ServiceList 
                serviceList={serviceList} 
                entityNumberId={entity.numberId}
                isAuthenticated={isAuthenticated} 
            />
            {openModal === 'ServiceList' && serviceState.selectedService &&
                <BookingServiceModal
                    setStep={setStep}
                    step={step}
                    professionals={professionalsByService}
                    entityId={entity.id}
                />
            }
        </>
    )
}