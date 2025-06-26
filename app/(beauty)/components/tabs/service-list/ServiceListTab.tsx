'use client'

import { useEffect, useState } from 'react'
import { useModal, useService } from '@/store'
import { ServiceList, BookingServiceModal } from '../..'
import { SERVICE_INITIAL_STATE } from '@/util/const'
import { professionals as allProfessionals } from '@/util/fake-data'

interface Props {
    serviceList: Service[],
    professionals?: ProfessionalData[]
    professionalId?: string
}

export const ServiceListTab = ({ serviceList, professionals, professionalId }: Props) => {

    const [step, setStep] = useState(1)
    const { serviceState, setServiceState } = useService()
    const { openModal } = useModal()
    
    useEffect(() => {
        if (openModal) {
            if (professionalId) {
                const professional = allProfessionals.find(p => p.id === professionalId)!

                if (professional) {
                    setServiceState({
                        ...serviceState,
                        selectedProfessional: professional.name
                    })
                }
            }
        } else {
            setStep(1)
        }

    }, [openModal])

    return (
        <>
            <ServiceList serviceList={serviceList} />
            {openModal === 'ServiceList' && serviceState.selectedService &&
                <BookingServiceModal
                    setStep={setStep}
                    step={step}
                    professionals={professionals}
                />
            }
        </>
    )
}