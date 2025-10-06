import { useModal, useService } from '@/store'
import { useSchedule } from '../../store'
import { format24 } from '@/helpers'

export const EventSummaryButtons = () => {

    const { setServiceState } = useService()
    const { setOpenModal } = useModal()
    const { selectedEvent } = useSchedule(state => state.schedule)


    const handleCancelEvent = () => {
        //TODO: Remove event
        if (!selectedEvent) return
        // deleteEvent(selectedEvent.id)
    }

    const handleUpdateEvent = () => {
        if (!selectedEvent) return
        const { title, isAdminBooking, customerReview, allDay, start: selectedDate, end, ...rest } = selectedEvent
        const selectedHour = format24(selectedDate)
        setServiceState({ ...rest, selectedDate, selectedHour })
        setOpenModal('ServiceList')
    }

    return (
        <div className="flex gap-2 mt-2">
            <button onClick={handleUpdateEvent} disabled={selectedEvent?.isAdminBooking} className="flex items-center py-0.5 px-3 border border-green-700 rounded-full cursor-pointer disabled:bg-zinc-400 disabled:border-0 disabled:cursor-not-allowed">Modificar cita</button>
            <button onClick={handleCancelEvent} className="flex items-center py-0.5 px-3 border border-red-500 rounded-full cursor-pointer">Cancelar cita</button>
        </div>
    )
}
