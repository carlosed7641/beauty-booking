'use client'

import { useEffect, useState } from 'react'
import { useModal, useService } from '@/store'
import { BookingCancelModal, BookingServiceModal } from '..'
import { SERVICE_INITIAL_STATE } from '@/util/const'

export const ReservationOptions = ({ professionals }: { professionals: ProfessionalSchedule[] }) => {

    const [step, setStep] = useState(1)
    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)
    const openModal = useModal(state => state.openModal)

    useEffect(() => {
        if (!openModal) {
            setServiceState(SERVICE_INITIAL_STATE)
            setStep(1)
        }
    }, [openModal])

    return (
        <>
            {
                openModal === 'Reservation:Update' &&
                <BookingServiceModal
                    step={step}
                    setStep={setStep}
                    entityId={serviceState.id ?? ''}
                    professionals={professionals}
                    isProfessionalView
                />
            }
            {
                openModal === 'Reservation:Cancel' &&
                <BookingCancelModal />
            }
        </>
    )

}
