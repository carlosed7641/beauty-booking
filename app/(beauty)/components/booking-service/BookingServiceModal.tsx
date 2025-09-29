import { SelectProfessional, SelectDate, SelectHour, BookingButton, Confirm } from '..'
import { Modal, ModalHeader } from '@/components/ui/modal'
import { useModal, useService } from '@/store'
import { SERVICE_INITIAL_STATE } from '@/util/const'
import { IoMdArrowRoundBack } from 'react-icons/io'

interface Props {
    step: number
    setStep: (step: number) => void
    professionals?: ProfessionalData[]
    isAdmin?: boolean
    dates?: DateItem[]
}

export const BookingServiceModal = ({
    step,
    setStep,
    professionals,
    isAdmin,
    dates
}: Props) => {

    const { serviceState, setServiceState } = useService()
    const  { setOpenModal } = useModal()

    const handleBack = () => {
        setServiceState(SERVICE_INITIAL_STATE)
        setOpenModal('ScheduleAssing')
    }

    return (
        <Modal>
            <ModalHeader>
                {step == 1 &&
                    <div className="flex gap-3">
                        { isAdmin && <IoMdArrowRoundBack className="cursor-pointer text-xl" onClick={handleBack} />}
                        <div className="flex flex-col gap-1">
                            <p className="text-xl font-bold">{serviceState.selectedService?.name}</p>
                            {isAdmin && serviceState.customer && <p className="text-zinc-500">Cliente: {serviceState.customer.name}</p>}
                            <p className="text-zinc-500">{serviceState.selectedService?.duration} aprox</p>
                            {
                                !isAdmin &&
                                <div className="flex gap-1">
                                    Desde
                                    <p className="text-green-700 font-bold">${serviceState.selectedService?.price}</p>
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
                        {professionals && <SelectProfessional professionals={professionals} />}
                        {serviceState.selectedProfessional && <SelectDate isAdmin={isAdmin} dates={dates} />}
                        {serviceState.selectedProfessional && serviceState.selectedDate &&
                            <>
                                <SelectHour />
                                <BookingButton setStep={setStep} />
                            </>
                        }
                    </>
                }
                {step === 2 && <Confirm />}
            </div>
        </Modal>
    )
}
