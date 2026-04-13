'use client'

import { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { SelectProfessional, SelectDate, SelectHour, BookingButton, Confirm } from '..'
import { Modal, ModalHeader } from '@/components/ui/modal'
import { useModal, useService } from '@/store'
import { formatDisplayNumber } from '@/helpers'
import { SERVICE_INITIAL_STATE } from '@/util/const'

interface Props {
    step: number
    setStep: (step: number) => void
    professionals?: ProfessionalSchedule[]
    isAdmin?: boolean
    isEmployee?: boolean
    dates?: DateItem[]
    initialYear?: number
    entityId: string
}

export const BookingServiceModal = ({
    step,
    setStep,
    professionals,
    isAdmin,
    dates,
    entityId,
    initialYear,
    isEmployee
}: Props) => {

    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)
    const setOpenModal = useModal(state => state.setOpenModal)

    const handleBack = () => {
        setServiceState(SERVICE_INITIAL_STATE)
        setOpenModal(serviceState.id ? 'ScheduleEvent' : 'ScheduleAssing')
    }

    const currentProfessionalService = professionals
        ?.find(p => p.id === serviceState.selectedProfessional?.id)
        ?.services.find(s => s.id === serviceState.selectedService?.serviceId) ?? serviceState?.selectedService

    const professionalWorkdays = professionals
        ?.find(p => p.id === serviceState.selectedProfessional?.id)?.workdays ?? []

    return (
        <Modal>
            <ModalHeader>
                {step == 1 &&
                    <div className="flex gap-3">
                        {isAdmin && <IoMdArrowRoundBack className="cursor-pointer text-xl" onClick={handleBack} />}
                        <div className="flex flex-col gap-1">
                            <p className="text-xl font-bold">{serviceState.selectedService?.name}</p>
                            {isAdmin && serviceState.customer && <p className="text-zinc-500">Cliente: {serviceState.customer.name}</p>}
                            {
                                currentProfessionalService &&
                                <ServiceDuration {...currentProfessionalService.duration} />
                            }
                            {
                                !isAdmin &&
                                <div className="flex gap-1">
                                    Desde
                                    <p className="text-green-700 font-bold">${formatDisplayNumber(serviceState.selectedService?.price!)}</p>
                                </div>
                            }
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
                        {
                            isEmployee ?
                                null
                                :
                                professionals && professionals.length > 0
                                    ? <SelectProfessional professionals={professionals} />
                                    : <p className="text-center ">No hay profesionales que se hayan asignado al servicio elegido</p>
                        }
                        {serviceState.selectedProfessional &&
                            <SelectDate
                                isAdmin={isAdmin}
                                dates={dates}
                                openYear={initialYear}
                                professionalWorkdays={professionalWorkdays}
                            />
                        }
                        {serviceState.selectedProfessional && serviceState.selectedDate &&
                            <>
                                <SelectHour
                                    duration={currentProfessionalService?.duration!}
                                    workdays={professionalWorkdays}
                                />
                                <BookingButton setStep={setStep} />
                            </>
                        }
                    </>
                }
                {step === 2 && (
                    <Confirm
                        entityId={entityId}
                        price={currentProfessionalService?.price!}
                        duration={currentProfessionalService?.duration!}
                    />
                )}
            </div>
        </Modal>
    )
}

const ServiceDuration = (duration: { hours: number, minutes: number }) => {
    return (
        <p className="text-zinc-500">{duration.hours > 0 ? `${duration.hours} ${duration.hours === 1 ? 'hr' : 'hrs'} ${duration.minutes > 0 ? 'y ' + duration.minutes + ' min' : ''}` : `${duration.minutes} min`} aprox</p>
    )
}