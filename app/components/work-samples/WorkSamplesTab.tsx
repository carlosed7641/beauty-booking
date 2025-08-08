'use client'
import { useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import { useModal } from '@/store'
import { WorkSamples } from './WorkSamples'
import { Modal } from '@/components'
import { SLIDER_SETTINGS } from '@/util/const'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

interface Props {
    workSamples: WorkSample[]
    hideFilters?: boolean
    hideName?: boolean
}

export const WorkSamplesTab = ({ workSamples, hideFilters, hideName }: Props) => {

    const [selectedGallery, setSelectedGallery] = useState<{id: string, name: string}>({id: '', name: ''})
    const { openModal, setOpenModal } = useModal()

    const handleSelectGallery = (id: string, name: string) => {
        setSelectedGallery({ id,  name })
        setOpenModal(WorkSamplesTab.name)
    }

    return (
        <>
            <WorkSamples workSamples={workSamples} handleSelectGallery={handleSelectGallery} hideFilters={hideFilters} 
                hideName={hideName} />
            {
                openModal === WorkSamplesTab.name && selectedGallery.id &&
                <Modal className="overflow-hidden! h-fit! pb-10! pt-5! px-0! md:px-6! md:pt-0! md:pb-6!  md:w-1/3! ">
                    <div className="md:max-w-[400px] my-auto mx-auto md:p-2">
                        <Slider {...SLIDER_SETTINGS}>
                            {workSamples.find(sample => sample.id === selectedGallery.id)?.images?.map((image, index) => (
                                <div key={index}>
                                    <Image
                                        className="w-full"
                                        src={image.url}
                                        alt={selectedGallery.name}
                                        width={160}
                                        height={170} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Modal>
            }
        </>
    )
}