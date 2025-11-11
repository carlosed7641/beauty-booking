import { useModal } from '@/store'
import { Modal, ModalHeader, ProfileForm } from '@/components'
import { IoMdArrowRoundBack } from 'react-icons/io'

export const UpdateCustomer = () => {

    const { setOpenModal } = useModal()

    const onSubmitCustomer = (data: Omit<Session, "id" | "shareNumberPhone">) => {
        console.log(data)
        //TODO: Save To BD
        setOpenModal('ScheduleAssing')
    }

    return (
        <Modal className="md:w-[700px]! md:overflow-hidden!">
            <ModalHeader>
                <h1 className="text-green-700 font-bold flex items-center gap-2">
                    <IoMdArrowRoundBack className="cursor-pointer text-xl" onClick={() => setOpenModal('ScheduleAssing')} />
                    Editor de clientes
                </h1>
            </ModalHeader>
            <ProfileForm onSubmit={onSubmitCustomer} />
        </Modal>
    )
}
