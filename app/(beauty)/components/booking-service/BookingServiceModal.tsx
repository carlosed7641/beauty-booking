import { useService } from '@/store'
import { Modal, ModalHeader } from '@/components/ui/modal'
import { SelectProfessional } from '@/components/ui/tabs/service-list/SelectProfessional'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { SelectDate } from '@/components/ui/tabs/service-list/SelectDate'
import { SelectHour } from '@/components/ui/tabs/service-list/SelectHour'
import { BookingButton } from '@/components/ui/tabs/service-list/BookingButton'
import { Confirm } from '@/components/ui/tabs/service-list/Confirm'

interface Props {
    step: number
    setStep: (showModal: number) => void
    setShowModal: (showModal: boolean) => void
    professionals?: ProfessionalData[]
}

export const BookingServiceModal = ({ 
    step, 
    setStep, 
    setShowModal, 
    professionals
}: Props) => {

    const { serviceState } = useService()

    return (
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
                        {professionals && <SelectProfessional professionals={professionals} />}
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
        </Modal>
    )
}
