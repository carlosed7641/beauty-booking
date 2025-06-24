import { FaStar, FaStarHalf } from 'react-icons/fa'
import { getStars } from '@/helpers'

export const StarQuantity = ({ points }: { points: number }) => {

    const { fullStars, half } = getStars(points)

    return (
        <div className="flex">
            {Array.from({ length: fullStars }, (_, idx) => (
                <FaStar key={idx} className="text-amber-300" />
            ))}
            {half && <FaStarHalf className="text-amber-300" />}
        </div>
    )
}