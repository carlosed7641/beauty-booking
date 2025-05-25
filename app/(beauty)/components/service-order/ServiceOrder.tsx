'use client'

import { useEffect, useState } from 'react'
import { IoReorderFourOutline } from 'react-icons/io5'
import { Modal, ModalHeader } from '@/components/ui/modal'
import { FilterList } from '../filter-list/FilterList'
import { ORDER_OPTIONS } from '@/util/const'

interface Props {
    selectedOrder: string | null
    setSelectedOrder: (selectedFilters: string) => void
}

export const ServiceOrder = ({ selectedOrder, setSelectedOrder }: Props) => {

    const [showModal, setShowModal] = useState(false)

    const handleClickOption = (option: string) => {
        if (option === selectedOrder) return
        setSelectedOrder(option)
        setShowModal(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        document.body.classList.toggle('overflow-hidden', showModal)
    }, [showModal])

    return (
        <>
            <div onClick={() => setShowModal(true)} className="flex gap-1 items-center justify-center cursor-pointer border-b border-zinc-300 md:border-0 w-1/2 md:w-auto">
                <IoReorderFourOutline />
                Ordernar
            </div>
            {
                showModal &&
                <Modal setShowModal={setShowModal}>
                    <ModalHeader setShowModal={setShowModal}>
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
