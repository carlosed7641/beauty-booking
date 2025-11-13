import { Emotion } from '@/components'
import { useSchedule } from '../../store'
import { CustomerReviewOptions } from './CustomerReviewOptions'

export const CustomerReview = () => {

    const { schedule, setSchedule } = useSchedule()

    return (
        <div className="mt-3">
            <span className="text-base font-bold">Indicanos si el cliente llegó a tiempo</span>
            {
                schedule.selectedEvent?.customerReview && !schedule.isUpdatingReview ?
                    <div className="flex items-center gap-2">
                        <Emotion showLabel averagePoints={schedule.selectedEvent.customerReview} />
                        <button onClick={() => setSchedule({ ...schedule, isUpdatingReview: true })} className="btn-primary rounded-full">Editar</button>
                    </div>
                    :
                    <CustomerReviewOptions />
            }
        </div>
    )
}
