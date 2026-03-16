import { RiEmotionHappyLine, RiEmotionNormalLine, RiEmotionUnhappyLine } from 'react-icons/ri'

interface Props {
    eventId: string
    setCustomerReview: (values: {reviewPoints: number, eventId: string}) => void
}

export const CustomerReviewOptions = ({ eventId, setCustomerReview }: Props) => {

    const onCustomerReview = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const reviewPoints = Number(e.currentTarget.value)
        setCustomerReview({ eventId, reviewPoints })
    }

    return (
        <div className="grid grid-cols-3 gap-2 md:w-fit py-2">
            <button onClick={onCustomerReview} value="3" className="flex flex-col items-center text-green-500 cursor-pointer">
                <RiEmotionHappyLine className="text-3xl" />
                <span className="text-xs">Llegó a tiempo</span>
            </button>
            <button onClick={onCustomerReview} value="2" className="flex flex-col items-center text-yellow-500 cursor-pointer">
                <RiEmotionNormalLine className="text-3xl" />
                <span className="text-xs">Llegó tarde</span>
            </button>
            <button onClick={onCustomerReview} value="1" className="flex flex-col items-center text-red-500 cursor-pointer">
                <RiEmotionUnhappyLine className="text-3xl" />
                <span className="text-xs">No llegó</span>
            </button>
        </div>
    )
}
