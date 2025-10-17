import React from 'react'
import { RiEmotionHappyLine, RiEmotionNormalLine, RiEmotionUnhappyLine } from 'react-icons/ri'
import { useSchedule } from '../../store'

export const CustomerReviewOptions = ({ setCustomerReview }: { setCustomerReview: (reviewPoints: number) => void}) => {
    return (
        <div className="grid grid-cols-3 gap-2 md:w-fit py-2">
            <div onClick={() => setCustomerReview(1)} className="flex flex-col items-center text-green-500 cursor-pointer">
                <RiEmotionHappyLine className="text-3xl" />
                <span className="text-xs">Llegó a tiempo</span>
            </div>
            <div onClick={() => setCustomerReview(2)} className="flex flex-col items-center text-yellow-500 cursor-pointer">
                <RiEmotionNormalLine className="text-3xl" />
                <span className="text-xs">Llegó tarde</span>
            </div>
            <div onClick={() => setCustomerReview(3)} className="flex flex-col items-center text-red-500 cursor-pointer">
                <RiEmotionUnhappyLine className="text-3xl" />
                <span className="text-xs">No llegó</span>
            </div>
        </div>
    )
}
