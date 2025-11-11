import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { useSchedule } from '../../store'
import { format12, formatDate, formatNumber } from '@/helpers'


export const EventSummaryInfo = () => {

    const { selectedEvent } = useSchedule(state => state.schedule)

    return (
        <>
            <span>{formatDate({ date: selectedEvent?.start!, weekday: true})}</span>
            <div className="flex gap-1">
                <span>{format12(selectedEvent?.start!)}</span>
                <span>-</span>
                <span>{format12(selectedEvent?.end!)}</span>
            </div>
            <span className="text-green-700 my-2">Cita con: <strong>{selectedEvent?.customer.name}</strong></span>
            {selectedEvent?.customer.phone &&
                <Link href={`https://wa.me/${selectedEvent.customer.phone}`} className="underline text-zinc-600 flex gap-1 mb-2" target="_blank">
                    <FaWhatsapp className="text-green-500" />
                    {selectedEvent.customer.phone.number}
                </Link>}                  <span>Reservado por: <strong>{selectedEvent?.isAdminBooking ? 'Administración' : 'Cliente'}</strong></span>
            <span>Duración: <strong>{selectedEvent?.selectedService.duration.hours}</strong></span>
            <span>Profesional: <strong>{selectedEvent?.selectedProfessional.name}</strong></span>
            <span>Valor del servicio: <strong>${formatNumber(selectedEvent?.selectedService.price.toString()!)}</strong></span>
        </>
    )
}
