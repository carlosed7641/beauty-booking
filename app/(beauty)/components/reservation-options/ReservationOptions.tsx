'use client'

import { useEffect, useState } from 'react'
import { useModal, useService } from '@/store'
import { BookingCancelModal, BookingServiceModal } from '..'
import { SERVICE_INITIAL_STATE } from '@/util/const'

export const ReservationOptions = () => {

    const [step, setStep] = useState(1)
    const { setServiceState } = useService()
    const { openModal } = useModal()

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
                />
            }
            {
                openModal === 'Reservation:Cancel' &&
                <BookingCancelModal />
            }
        </>
    )

}
