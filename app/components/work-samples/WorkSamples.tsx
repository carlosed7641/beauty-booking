'use client'
import { useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import { useModal } from '@/store'
import { WorkSamplesList } from './WorkSamplesList'
import { Modal } from '@/components'
import { SLIDER_SETTINGS } from '@/util/const'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

interface Props {
    workSamples: WorkSample[]
    hideFilters?: boolean
    hideName?: boolean
}

export const WorkSamples = ({ workSamples, hideFilters, hideName }: Props) => {

    const [selectedGallery, setSelectedGallery] = useState<{ id: string, name: string }>({ id: '', name: '' })
    const { openModal, setOpenModal } = useModal()

    const handleSelectGallery = (id: string, name: string) => {
        setSelectedGallery({ id, name })
        setOpenModal('WorkSampleGallery')
    }

    const wsOrderedByMainImage = workSamples.map(ws => ({
        ...ws,
        images: [...ws.images].sort((a, b) => Number(b.main) - Number(a.main))
    }))
    
    return (
        <>
            <WorkSamplesList workSamples={wsOrderedByMainImage} handleSelectGallery={handleSelectGallery} hideFilters={hideFilters}
                hideName={hideName} />
            {
                openModal === 'WorkSampleGallery' && selectedGallery.id &&
                <Modal className="overflow-hidden! h-fit! pb-10! pt-5! px-0! md:px-6! md:pt-0! md:pb-6! md:w-fit!">
                    <div className="md:max-w-100 my-auto mx-auto md:p-2">
                        <Slider {...SLIDER_SETTINGS}>
                            {wsOrderedByMainImage.find(sample => sample.id === selectedGallery.id)?.images?.map((image, index) => (
                                <div key={index}>
                                    <Image
                                        className="w-full aspect-square object-contain focus:outline-0"
                                        src={image.url}
                                        alt={selectedGallery.name}
                                        width={160}
                                        height={160} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Modal>
            }
        </>
    )
}