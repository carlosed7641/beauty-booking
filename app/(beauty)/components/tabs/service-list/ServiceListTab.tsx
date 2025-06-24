'use client'

import { useEffect, useState } from 'react'
import { useService } from '@/store'
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
    const [showModal, setShowModal] = useState(Boolean(serviceState?.selectedService))

    useEffect(() => {
        if (showModal) {
            if (professionalId) {
                const professional = allProfessionals.find(p => p.id === professionalId)!

                if (professional) {
                    setServiceState({
                        ...serviceState,
                        selectedProfessional: professional.name
                    })
                }
            }

            window.scrollTo(0, 0)
        } else {
            setServiceState(SERVICE_INITIAL_STATE)
            setStep(1)
        }

        document.body.classList.toggle('overflow-hidden', showModal)

    }, [showModal])

    return (
        <>
            <ServiceList serviceList={serviceList} setShowModal={setShowModal} />
            {showModal && serviceState.selectedService &&
                <BookingServiceModal
                    setShowModal={setShowModal}
                    setStep={setStep}
                    step={step}
                    professionals={professionals}
                />
            }
        </>
    )
}