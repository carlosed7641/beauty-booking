import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { formatedDate } from '@/helpers'

interface Props {
    reviews: ReviewList[]
}

export const ReviewList = ({ reviews }: Props) => {
    return (
        <ul className="flex flex-col gap-3 md:gap-6">
            {
                reviews.map(review => (
                    <li className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-3" key={review.id}>
                        <Image
                            className="rounded-full"
                            src={review.professional.photo}
                            width={80}
                            height={80}
                            alt={review.professional.name}
                        />
                        <div>
                            <p>{review.professional.name}</p>
                            <div className="flex items-center text-amber-300">
                                <span className="text-2xl font-bold mr-1">{review.points}</span>
                                {Array.from({ length: review.points }, (_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                        </div>
                        <p className="ml-auto text-sm text-zinc-500">{formatedDate(review.date)}</p>
                        <div className='w-full text-sm'>
                            Serivicio adquirido: {review.service.name}
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
