'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import { WorkSamples } from './WorkSamples'
import { Modal } from '@/components'
import { SLIDER_SETTINGS } from '@/util/const'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

export const WorkSamplesTab = ({ workSamples }: { workSamples: WorkSample[] }) => {

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
            <WorkSamples categoryMap={categoryMap} handleSelectGallery={handleSelectGallery} />
            {
                showModal &&
                <Modal className="overflow-hidden! h-fit! pb-10! pt-5! px-0! md:px-6! md:pt-0! md:pb-6!  md:w-1/3! " setShowModal={setShowModal}>
                    <div className="md:max-w-[400px] my-auto mx-auto md:p-2">
                        <Slider {...SLIDER_SETTINGS}>
                            {categoryMap[selectedGallery]?.map((item, index) => (
                                <div key={index}>
                                    <Image
                                        className="w-full"
                                        src={item.image}
                                        alt={item.category}
                                        width={160}
                                        height={170} />
                                    <div className="flex gap-2 items-center mb-2 mt-4 justify-center">
                                        <p className="text-green-700 font-bold">{item.name}</p>
                                        -
                                        <p>{item.author}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Modal>
            }
        </>
    )
}