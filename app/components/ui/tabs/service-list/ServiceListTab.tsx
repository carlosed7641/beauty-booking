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
import {  professionals as allProfessionals } from '@/util/fake-data'
interface Props {
    serviceList: Service[], 
    professionals?: Professional[] 
    professionalId?: string
}

export const ServiceListTab = ({ serviceList, professionals, professionalId }: Props ) => {

    const [step, setStep] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const { serviceState, setServiceState } = useService()

    useEffect(() => {

        if (showModal) {

            if (professionalId && showModal) {

                const professional = allProfessionals.find(p => p.id === professionalId)!

                setServiceState({
                    ...serviceState,
                    selectedProfessional: professional.name
                })
            }

            window.scrollTo(0, 0)

        } else {
            setServiceState(SERIVCE_INITIAL_STATE)
            setStep(1)
        }

        document.body.classList.toggle('overflow-hidden', showModal)

    }, [showModal])

    return (
        <>
            <ServiceList serviceList={serviceList} setShowModal={setShowModal} />
            {showModal && serviceState.selectedService &&
                <Modal setShowModal={setShowModal}>
                    <ModalHeader setShowModal={setShowModal}>
                        {step == 1 && <div className="flex flex-col gap-1">
                            <p className="text-xl font-bold">{serviceState.selectedService?.name}</p>
                            <p className="text-zinc-500">{serviceState.selectedService?.duration} aprox</p>
                            <div className="flex gap-1">
                                Desde
                                <p className="text-green-700 font-bold">${serviceState.selectedService?.price}</p>
                            </div>
                        </div>
                        }
                        {step == 2 &&
                            <div className="flex gap-2 items-center text-green-700 text-xl">
                                <IoMdArrowRoundBack onClick={() => setStep(1)} className="cursor-pointer" />
                                <div className="text-center">Verifica los datos de tu próxima reserva</div>
                            </div>
                        }
                    </ModalHeader>
                    <div className="flex flex-col gap-3">
                        {
                            step === 1 &&
                            <>
                                {!professionalId && <SelectProfessional professionals={professionals!} />}
                                {serviceState.selectedProfessional && <SelectDate />}
                                {serviceState.selectedDate &&
                                    <>
                                        <SelectHour />
                                        <BookingButton setStep={setStep} />
                                    </>
                                }
                            </>
                        }
                        {step === 2 && <Confirm setShowModal={setShowModal} />}
                    </div>
                </Modal>}
        </>
    )
}

