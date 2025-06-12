'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa6'
import { Modal, ModalHeader } from '@/components/ui/modal'
import { ReviewItem } from '../review-item/ReviewItem'

interface Props {
    counts: number
    points: number
    reviews: ReviewList[]
    photo?: string
    name: string
    alternativeStyle?: boolean
}

export const ReviewsModal = ({ photo, name, counts, points, reviews, alternativeStyle }: Props) => {

    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        document.body.classList.toggle('overflow-hidden', showModal)
    }, [showModal])


    return (
        <>
            {
                counts > 0 ?
                    <>
                        <button onClick={handleClick} className="flex flex-col items-center cursor-pointer w-fit">
                            {
                                alternativeStyle ?
                                    <div className="flex flex-col mb-2">
                                        {
                                            <div className="flex my-1">
                                                {Array.from({ length: Math.round(points) }, (_, i) => (
                                                    <FaStar key={i} className="text-amber-300" />
                                                ))}
                                            </div>
                                        }
                                        <span className="text-zinc-500 underline">{(counts)} Ver reseñas</span>
                                    </div>
                                    :
                                    <>
                                        <div className="flex gap-1 items-center">
                                            <FaStar className="text-amber-300" />
                                            {points}
                                        </div>
                                        <p className="text-zinc-500 underline">({counts}) Ver</p>
                                    </>
                            }
                        </button>
                        {
                            showModal &&
                            <Modal setShowModal={setShowModal}>
                                <ModalHeader setShowModal={setShowModal}>
                                    <div className="md:max-w-1/2">
                                        <div className="flex items-center gap-5">
                                            {
                                                photo ? <Image src={photo} alt={name} width={100} height={100} className="rounded-full" />
                                                    : <></>
                                            }
                                            <div className="flex flex-col">
                                                <p className="text-lg md:text-xl">{name}</p>
                                                <div className="text-amber-300 text-2xl font-bold flex items-center gap-1">
                                                    <FaStar className="text-xl" />
                                                    <span>{points}</span>
                                                </div>
                                                <span className="text-zinc-400 text-sm">Basado en {counts} reseñas</span>
                                            </div>

                                        </div>
                                    </div>
                                </ModalHeader>
                                <ul className="flex flex-col gap-3 md:gap-6">
                                    {reviews.map(review =>
                                        <ReviewItem
                                            key={review.id}
                                            date={review.date}
                                            name={review.user.name}
                                            photoUrl={review.user.photo}
                                            serviceName={review.service.name}
                                            points={review.points}
                                        />)
                                    }
                                </ul>
                            </Modal>
                        }
                    </>
                    :
                    <div className="mb-2 text-zinc-500">No hay reseñas</div>
            }
        </>
    )
}
