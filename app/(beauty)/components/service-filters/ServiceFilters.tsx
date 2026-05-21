'use client'

import { useEffect, useState } from 'react'
import { LiaFilterSolid } from 'react-icons/lia'
import { useModal, useSelectedFilters } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { FilterList } from '..'
import { DEFAULT_SERVICES_LIST } from '@/util/const'

export const ServiceFilters = () => {

    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const selectedFilters = useSelectedFilters(state => state.selectedFilters)
    const setSelectedFilters = useSelectedFilters(state => state.setSelectedFilters)
    const [temporalSelectedFilters, setTemporalSelectedFilters] = useState([...selectedFilters])

    useEffect(() => {
        setTemporalSelectedFilters([...selectedFilters])
    }, [openModal])

    const handleClickButton = () => {
        setOpenModal(null)
        setSelectedFilters([...temporalSelectedFilters])
    }

    const handleClickCategory = (category: string) => {
        setTemporalSelectedFilters(prev =>
            prev.includes(category)
                ? prev.filter(item => item !== category)
                : [...prev, category]
        )
    }

    return (
        <>
            <div onClick={() => setOpenModal(ServiceFilters.name)} className="flex justify-center border-b border-zinc-300 md:border-0 items-center gap-1 cursor-pointer w-1/2 md:w-auto">
                <LiaFilterSolid />
                Filtrar
            </div>
            {
                openModal === ServiceFilters.name &&
                <Modal className="md:w-137.5! overflow-hidden!">
                    <ModalHeader>
                        <p className="text-green-700 text-xl">Filtrar por categoría</p>
                    </ModalHeader>
                    <FilterList items={Object.keys(DEFAULT_SERVICES_LIST)} handleClick={handleClickCategory} selectedFilters={temporalSelectedFilters} />
                    <button onClick={handleClickButton} className="btn-primary mt-8 justify-center rounded-md flex justify-self-center w-32.5">Listo</button>
                </Modal>
            }
        </>
    )
}