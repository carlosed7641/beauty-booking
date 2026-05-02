'use client'

import { useModal } from '@/store'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa6'
import { Modal, ModalHeader } from '@/components'
import { ReviewItem } from '../reviews'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

interface Props {
    counts?: number
    points?: number
    reviews: ReviewList[]
    photo?: string
    name: string
    alternativeStyle?: boolean
}

export const ReviewsModal = ({ photo, name, counts, points, reviews, alternativeStyle }: Props) => {

    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)

    const [filteredReviews, setFilteredReviews] = useState<ReviewList[]>([...reviews])
    const [filteredPoints, setFilteredPoints] = useState<number | null>(null)

    const filters = new Set(reviews.map(r => r.points))
    const sortFilters = [...filters].sort((a, b) => b - a)

    useEffect(() => {
        if (!filteredPoints) {
            setFilteredReviews(reviews)
            return
        }

        setFilteredReviews(reviews.filter(r => r.points === filteredPoints))
    }, [filteredPoints])

    return (
        <>
            {
                counts && counts > 0 ?
                    <>
                        <button onClick={() => setOpenModal(ReviewsModal.name)} className="flex flex-col items-center cursor-pointer w-fit">
                            {
                                alternativeStyle ?
                                    <div className="flex flex-col mb-2">
                                        {
                                            <div className="flex my-1">
                                                {Array.from({ length: Math.round(points!) }, (_, i) => (
                                                    <FaStar key={i} className="text-amber-300" />
                                                ))}
                                            </div>
                                        }
                                        <span className="text-zinc-500 underline">({counts}) Ver reseñas</span>
                                    </div>
                                    :
                                    <>
                                        <div className="flex gap-1 items-center">
                                            <FaStar className="text-amber-300" />
                                            {points?.toFixed(1)}
                                        </div>
                                        <p className="text-zinc-500 underline">({counts}) Ver</p>
                                    </>
                            }
                        </button>
                        {
                            openModal === ReviewsModal.name &&
                            <Modal>
                                <ModalHeader>
                                    <div className="md:max-w-1/2">
                                        <div className="flex items-center gap-5">

                                            <Image src={photo ?? '/images/placeholder.jpg'} alt={name} width={100} height={100} className="rounded-full aspect-square" />
                                            <div className="flex flex-col">
                                                <p className="text-lg md:text-xl">{name}</p>
                                                <div className="text-amber-300 text-2xl font-bold flex items-center gap-1">
                                                    <FaStar className="text-xl" />
                                                    <span>{points?.toFixed(1)}</span>
                                                </div>
                                                <span className="text-zinc-400 text-sm">Basado en {counts} reseñas</span>
                                            </div>

                                        </div>
                                    </div>
                                </ModalHeader>
                                <ul className="flex gap-3 my-4">
                                    <li onClick={() => setFilteredPoints(null)}
                                        className={
                                            clsx(
                                                "bg-green-200 text-green-700 px-3 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white cursor-pointer",
                                                {
                                                    "bg-green-700 text-white": !filteredPoints
                                                }
                                            )
                                        }
                                    >
                                        Todas
                                    </li>
                                    {sortFilters.map(points => (
                                        <li onClick={() => setFilteredPoints(points)}
                                            className={
                                                clsx(
                                                    "bg-green-200 text-green-700 px-3 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white cursor-pointer",
                                                    {
                                                        "bg-green-700 text-white": filteredPoints === points
                                                    }
                                                )
                                            }
                                            key={points}>{points}★</li>
                                    ))}
                                </ul>
                                <ul className="flex flex-col gap-3 md:gap-6">
                                    {filteredReviews.map(review =>
                                        <ReviewItem
                                            key={review.id}
                                            date={review.date}
                                            name={review.user.name!}
                                            photoUrl={review.user.photo!}
                                            serviceName={review.title}
                                            points={review.points}
                                        />)
                                    }
                                </ul>
                            </Modal>
                        }
                    </>
                    :
                    <div className={`text-zinc-500 flex flex-col ${alternativeStyle ? 'justify-start h-auto' : 'justify-end h-[stretch] '}`}>No hay reseñas</div>
            }
        </>
    )
}