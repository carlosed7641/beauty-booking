'use client'

import { useEffect, useState } from 'react'
import { useService } from '@/store'
import { Modal, ModalHeader } from '../../modal'
import { ServiceList } from './ServiceList'
import { SelectProfessional } from './SelectProfessional'
import { SelectDate } from './SelectDate'
import { SelectHour } from './SelectHour'
import { BookingButton } from './BookingButton'
import { SERIVCE_INITIAL_STATE } from '@/util/const'

export const ServiceListTab = () => {

    const [showModal, setShowModal] = useState(false)
    const { serviceState, setServiceState } = useService()

    useEffect(() => {
        window.scrollTo(0, 0)
        document.body.classList.toggle('overflow-hidden', showModal)
        if (!showModal) {
            setServiceState(SERIVCE_INITIAL_STATE)
        }
    }, [showModal])

    return (
        <>
            <ServiceList setShowModal={setShowModal} />
            {showModal && serviceState.selectedService &&
                <Modal setShowModal={setShowModal}>
                    <ModalHeader setShowModal={setShowModal}>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl font-bold">{serviceState.selectedService?.name}</p>
                            <p className="text-zinc-500">{serviceState.selectedService?.duration} aprox</p>
                            <div className="flex gap-1">
                                Desde
                                <p className="text-green-700 font-bold">${serviceState.selectedService?.price}</p>
                            </div>
                        </div>
                    </ModalHeader>
                    <div className="flex flex-col gap-3">
                        <SelectProfessional />
                        {serviceState.selectedProfessional && <SelectDate />}
                        {serviceState.selectedDate &&
                            <>
                                <SelectHour />
                                <BookingButton setShowModal={setShowModal} />
                            </>
                        }
                    </div>
                </Modal>}
        </>
    )
}

