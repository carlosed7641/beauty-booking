import { Modal, ModalHeader, Emotion } from '@/components'
import { useSchedule } from '../../store'
import { EventSummaryInfo } from './EventSummaryInfo'
import { CustomerReviewOptions } from './CustomerReviewOptions'
import { EventSummaryButtons } from './EventSummaryButtons'

export const EventSummary = () => {

    const { selectedEvent, isUpdatingReview } = useSchedule(state => state.schedule)
    const { schedule, setSchedule } = useSchedule()

    const now = new Date().getTime()
    const endDate = selectedEvent?.end.getTime()!

    const setCustomerReview = (reviewPoints: number) => {
        //TODO: Api post
        if (!selectedEvent) return
        const { id, customerReview } = selectedEvent
        console.log(id, customerReview)
    }

    return (
        <Modal className="overflow-hidden! md:w-175!">
            <ModalHeader>
                <h1 className="text-green-700 font-bold">{selectedEvent?.title}</h1>
            </ModalHeader>
            <div className="flex flex-col text-sm">
                <EventSummaryInfo />
                {
                    now > endDate ?
                        <div className="mt-3">
                            <span className="text-base font-bold">Indicanos si el cliente llegó a tiempo</span>
                            {
                                selectedEvent?.customerReview && !isUpdatingReview ?
                                    <div className="flex items-center gap-2">
                                        <Emotion showLabel averagePoints={selectedEvent.customerReview} />
                                        <button onClick={() => setSchedule({ ...schedule, isUpdatingReview: true })} className="btn-primary rounded-full">Editar</button>
                                    </div>
                                    :
                                    <CustomerReviewOptions setCustomerReview={setCustomerReview} />
                            }
                        </div>
                        :
                        <EventSummaryButtons />
                }
            </div>
        </Modal>
    )
}
