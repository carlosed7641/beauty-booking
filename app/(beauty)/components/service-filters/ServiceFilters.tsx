'use client'

import { useEffect, useState } from 'react'
import { LiaFilterSolid } from 'react-icons/lia'
import { useSelectedFilters } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { FilterList } from '..'
import { categories } from '@/util/fake-data'

export const ServiceFilters = () => {

    const [showModal, setShowModal] = useState(false)
    const { selectedFilters, setSelectedFilters } = useSelectedFilters()
    const [temporalSelectedFilters, setTemporalSelectedFilters] = useState([...selectedFilters])

    useEffect(() => {
        window.scrollTo(0, 0)
        document.body.classList.toggle('overflow-hidden', showModal)
        setTemporalSelectedFilters([...selectedFilters])
    }, [showModal])

    const handleClickButton = () => {
        setShowModal(false)
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
            <div onClick={() => setShowModal(true)} className="flex justify-center border-b border-zinc-300 md:border-0 items-center gap-1 cursor-pointer w-1/2 md:w-auto">
                <LiaFilterSolid />
                Filtrar
            </div>
            {
                showModal &&
                <Modal setShowModal={setShowModal}>
                    <ModalHeader setShowModal={setShowModal}>
                        <p className="text-green-700 text-xl">Filtrar por categoría</p>
                    </ModalHeader>
                    <FilterList items={categories} handleClick={handleClickCategory} selectedFilters={temporalSelectedFilters} />
                    <button onClick={handleClickButton} className="bg-green-700 mt-8 justify-center cursor-pointer rounded-md py-1.5 text-white hover:bg-green-800 flex justify-self-center w-[130px]">Listo</button>
                </Modal>
            }
        </>
    )
}