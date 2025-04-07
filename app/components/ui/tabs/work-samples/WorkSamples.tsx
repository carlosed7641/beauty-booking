'use client'

import { useEffect, useState } from 'react'
import { Modal } from '../../modal/Modal'
import Image from 'next/image'
import { GrGallery } from 'react-icons/gr'

const workSamples = [
    {
        category: 'Fade',
        image: 'https://picsum.photos/160/170',
        author: 'Carlos Castro'
    },
    {
        category: 'Siete',
        image: 'https://picsum.photos/160/170',
        author: 'Gregorio Carrena'
    },
    {
        category: 'Fade',
        image: 'https://picsum.photos/160/170',
        author: 'Gregorio Carrena'
    }
]

export const WorkSamples = () => {

    const [showModal, setShowModal] = useState(false)
    const [selectedGallery, setSelectedGallery] = useState('')
    // const categoryMap = Object.groupBy(workSamples, ({ category })=> category) // Not supportted
    const categoryMap = workSamples.reduce<Record<string, typeof workSamples>>((acc, sample) => {
        if (!acc[sample.category]) {
            acc[sample.category] = []
        }
        acc[sample.category].push(sample)
        return acc
    }, {})

    const handleSelectGallery = (category: string) => {
        setSelectedGallery(category)
        setShowModal(true)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        document.body.classList.toggle('overflow-hidden', showModal)
    }, [showModal])

    return (
        <>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-7 md:gap-3">
                {
                    Object.entries(categoryMap).map(([category, sample]) => (
                        sample && sample.length > 0 && (
                            <div onClick={() => handleSelectGallery(category)} key={category}
                                className="flex flex-col bg-zinc-100 cursor-pointer relative">
                                <Image
                                    className="w-auto"
                                    title={category}
                                    width={160}
                                    height={170}
                                    src={sample[0].image}
                                    alt={category}
                                />
                                {
                                    sample.length > 1 &&
                                    <div className="absolute top-2 right-2 bg-zinc-100 p-1">
                                        <GrGallery />
                                    </div>
                                }
                                <div className="p-2">
                                    <p className="font-bold">{category}</p>
                                    <span className="block truncate">{sample[0].author}</span>
                                </div>
                            </div>
                        )
                    ))
                }
            </div>
            {
                showModal &&
                <Modal setShowModal={setShowModal}>
                    <div>
                        {categoryMap[selectedGallery]?.map((item, index) => (
                            <img key={index} src={item.image} alt={item.category} />
                        ))}
                    </div>
                </Modal>
            }
        </>
    )
}
