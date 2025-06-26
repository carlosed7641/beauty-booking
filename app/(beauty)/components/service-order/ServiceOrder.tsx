'use client'

import { IoReorderFourOutline } from 'react-icons/io5'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { FilterList } from '..'
import { ORDER_OPTIONS } from '@/util/const'

interface Props {
    selectedOrder: string | null
    setSelectedOrder: (selectedFilters: string) => void
}

export const ServiceOrder = ({ selectedOrder, setSelectedOrder }: Props) => {

    const { openModal, setOpenModal } = useModal()

    const handleClickOption = (option: string) => {
        if (option === selectedOrder) return
        setSelectedOrder(option)
        setOpenModal(null)
    }

    return (
        <>
            <div onClick={() => setOpenModal('ServiceOrder.name')} className="flex gap-1 items-center justify-center cursor-pointer border-b border-zinc-300 md:border-0 w-1/2 md:w-auto">
                <IoReorderFourOutline />
                Ordernar
            </div>
            {
                openModal === 'ServiceOrder.name' &&
                <Modal>
                    <ModalHeader>
                        <p className="text-green-700 text-xl">Ordenar por</p>
                    </ModalHeader>
                    <FilterList
                        items={ORDER_OPTIONS}
                        handleClick={handleClickOption}
                        selectedFilters={[selectedOrder as string]}
                    />
                </Modal>
            }
        </>
    )
}