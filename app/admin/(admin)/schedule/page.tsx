'use client'

import { Calendar, Event } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useModal } from '@/store'
import { getMessagesES, localizer } from '@/helpers'
import { useState } from 'react'
import { Modal, ModalHeader } from '@/components'

const events = [
    {
        title: 'Corte hombre',
        start: new Date(2025, 8, 10, 10, 0, 0), // 10 de septiembre 2025, 10:00
        end: new Date(2025, 8, 10, 12, 0, 0),   // 10 de septiembre 2025, 12:00
        allDay: false
    }
]


export default function SchedulesPage() {

    const { openModal, setOpenModal } = useModal()
    const [selectedEvent, setSelectedEvent] = useState<Event>()

    const onSelect = (event: Event) => {
        setOpenModal(SchedulesPage.name)
        setSelectedEvent(event)
    }

    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Agenda</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <Calendar
                        culture='es'
                        messages={getMessagesES()}
                        views={['month', 'week', 'day']}
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        eventPropGetter={() => ({
                            style: {
                                backgroundColor: '#008236',
                                color: '#ffffff'
                            }
                        })}
                        onSelectEvent={onSelect}
                        className="h-screen! md:h-[500px]!"
                    />
                </div>
            </div>
            {
                openModal === SchedulesPage.name &&
                <Modal className="overflow-hidden!">
                    <ModalHeader>
                        <h1 className="text-green-700 font-bold">{selectedEvent?.title}</h1>
                    </ModalHeader>
                    Yesss
                </Modal>
            }
        </>
    )
}