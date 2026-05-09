'use client'

import Image from 'next/image'
import { FaCheckCircle } from 'react-icons/fa'
import { useModal, useService } from '@/store'
import { Modal, ModalHeader } from '../ui/modal'
import { formatDate, formatTextHour } from '@/helpers'

export const SucessBooking = () => {

    const serviceState = useService(state => state.serviceState)
    const setOpenModal = useModal(state => state.setOpenModal)

    return (
        <Modal className="md:max-w-120 overflow-hidden!">
            <ModalHeader>
                <div className="flex gap-2 text-xl items-center text-green-700">
                    <FaCheckCircle className="text-green-500" />
                    Tu reserva ha sido exitosa
                </div>
            </ModalHeader>
            <div className="flex flex-col gap-3 items-center">
                <div className="flex justify-center items-center">
                    {
                        serviceState.selectedProfessional?.photo ?
                            <Image
                                className="rounded-full h-22 w-22 object-cover"
                                width={88}
                                height={88}
                                alt="Imagen profesional"
                                src={serviceState.selectedProfessional?.photo}
                            />
                            :
                            <div className="rounded-full bg-green-700 text-white text-6xl font-bold flex justify-center items-center h-22 w-22">
                                {serviceState.selectedProfessional?.name[0]}
                            </div>
                    }
                </div>
                <div className="text-lg text-center">
                    <p className="font-bold">{serviceState.selectedProfessional?.name}</p>
                    <span>¡Te espera!</span>
                </div>
                <div className="flex flex-col text-center">
                    El {formatDate({ date: serviceState.selectedDate!, weekday: 'long' }).toLocaleLowerCase()} a las
                    <span className="text-xl text-green-700 font-bold">{formatTextHour(serviceState.selectedHour!)}</span>
                </div>
                <span>Recuerda llegar 5 minutos antes</span>
                <button onClick={() => setOpenModal(null)} className="btn-primary rounded-full">Cerrar</button>
            </div>
        </Modal>
    )
}
