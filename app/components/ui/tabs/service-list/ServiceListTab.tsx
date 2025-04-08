'use client'

import { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useService } from '@/store'
import { Modal, ModalHeader } from '../../modal'
import { ServiceList } from './ServiceList'
import { SelectProfessional } from './SelectProfessional'
import { SelectDate } from './SelectDate'
import { SelectHour } from './SelectHour'
import { BookingButton } from './BookingButton'
import { Confirm } from './Confirm'
import { SERIVCE_INITIAL_STATE } from '@/util/const'

export const ServiceListTab = () => {

    const [step, setStep] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const { serviceState, setServiceState } = useService()

    useEffect(() => {
        window.scrollTo(0, 0)
        document.body.classList.toggle('overflow-hidden', showModal)
        if (!showModal) {
            setServiceState(SERIVCE_INITIAL_STATE)
            setStep(1)
        }
    }, [showModal])

    return (
        <>
            <ServiceList setShowModal={setShowModal} />
            {showModal && serviceState.selectedService &&
                <Modal setShowModal={setShowModal}>
                    <ModalHeader setShowModal={setShowModal}>
                        {   step == 1 && <div className="flex flex-col gap-1">
                            <p className="text-xl font-bold">{serviceState.selectedService?.name}</p>
                            <p className="text-zinc-500">{serviceState.selectedService?.duration} aprox</p>
                            <div className="flex gap-1">
                                Desde
                                <p className="text-green-700 font-bold">${serviceState.selectedService?.price}</p>
                            </div>
                            </div>
                        }
                        { step == 2 && 
                            <div className="flex gap-2 items-center text-green-700 text-xl">
                                <IoMdArrowRoundBack onClick={()=> setStep(1)} className="cursor-pointer" />
                                <div className="text-center">Verifica los datos de tu próxima reserva</div>
                            </div>
                        }
                    </ModalHeader>
                    <div className="flex flex-col gap-3">
                        {
                            step === 1 &&
                            <>
                                <SelectProfessional />
                                {serviceState.selectedProfessional && <SelectDate />}
                                {serviceState.selectedDate &&
                                    <>
                                        <SelectHour />
                                        <BookingButton setStep={setStep} />
                                    </>
                                }
                            </>
                        }
                        { step === 2 && <Confirm setShowModal={setShowModal} /> }
                    </div>
                </Modal>}
        </>
    )
}

