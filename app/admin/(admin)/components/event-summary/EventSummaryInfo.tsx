import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { useSchedule } from '../../store'
import { format12, formatDate, formatDisplayNumber } from '@/helpers'
import { Emotion } from '@/components'


export const EventSummaryInfo = () => {

    const selectedEvent = useSchedule(state => state.schedule.selectedEvent)

    return (
        selectedEvent && (
            <>
                <span>{formatDate({ date: selectedEvent.start, weekday: 'long' })}</span>
                <div className="flex gap-1">
                    <span>{format12(selectedEvent.start)}</span>
                    <span>-</span>
                    <span>{format12(selectedEvent.end)}</span>
                </div>
                <div className="text-green-700 my-2 flex gap-2 items-center">
                    <span>Cita con: <strong>{selectedEvent?.customer.name}</strong></span>
                    {selectedEvent?.customer.userId &&  <Emotion size="text-2xl" averagePoints={selectedEvent.customer.customerAvgRating ?? 3} />}
                </div>
                {selectedEvent?.customer.phone &&
                    <Link href={`https://wa.me/${selectedEvent.customer.phone.number}`} className="underline text-zinc-600 flex gap-1 mb-2 w-fit" target="_blank">
                        <FaWhatsapp className="text-green-500" />
                        {selectedEvent.customer.phone.number}
                    </Link>}
                <span>Reservado por: <strong>{selectedEvent?.isAdminBooking ? 'Administración' : 'Cliente'}</strong></span>
                <span>Duración: <strong>{selectedEvent.selectedService.duration.hours > 0 ? `${selectedEvent?.selectedService.duration.hours} ${selectedEvent.selectedService.duration.hours === 1 ? 'hr' : 'hrs'} ${selectedEvent.selectedService.duration.minutes > 0 ? 'y ' + selectedEvent.selectedService.duration.minutes + ' min' : ''}` : `${selectedEvent.selectedService.duration.minutes} min`}</strong></span>
                <span>Profesional: <strong>{selectedEvent?.selectedProfessional.name}</strong></span>
                <span>Valor del servicio: <strong>${formatDisplayNumber(selectedEvent?.selectedService.price!)}</strong></span>
            </>
        )
    )
}
