'use client'

import { useEffect, useState } from 'react'
import { GoQuestion, GoCheck } from 'react-icons/go'
import { useModal } from '@/store'
import { SimpleTabs } from '@/components'
import { CustomDays, ScheduleSelect, SelectProfessional, EventHistory } from '../components'
import { compareDates } from '@/helpers'
import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'

const tabs = [
    { id: 'all', label: 'Todas' },
    { id: 'no-rated', label: 'Reservas sin calificar', icon: GoQuestion },
    { id: 'rated', label: 'Reservas Efectivas', icon: GoCheck }
]

interface Props {
    professionals: ProfessionalData[]
    events: EventDate[]
    foundationYear: number
}

export function ScheduleHistory({ professionals, events, foundationYear }: Props) {

    const [date, setDate] = useState(new Date())
    const [currentTab, setCurrentTab] = useState('all')
    const [currentEvents, setCurrentEvents] = useState<EventDate[]>([])
    const [selectedProfessional, setSelectedProfessional] = useState(professionals[0])
    const { openModal, setOpenModal } = useModal()

    const onChangeDate = (value: number, type: 'month' | 'year') => {
        setDate(prev => {
            const newDate = new Date(prev)
            type === 'year' ? newDate.setFullYear(value) : newDate.setMonth(value)
            return newDate
        })

        setOpenModal(null)
    }

    useEffect(() => {
        const getEvents = () => {
            // TODO: Api get Select events where selectedProfessional.id === event.selectedProfessional.id && date === event.start
            const filteredEvents = events.filter(event => {
                const isSameDay = compareDates(date, event.start)
                const isSameProfesional = selectedProfessional.id === event.selectedProfessional.id
                return isSameDay && isSameProfesional
            })

            return filteredEvents
        }

        const filteredEvents = getEvents()
        setCurrentEvents(filteredEvents)

    }, [date, selectedProfessional])

    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <Link href="/admin" title="Volver">
                    <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                </Link>
                <h1 className="text-lg text-green-700 font-bold">Historial de agenda</h1>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative flex flex-col gap-4">
                    <CustomDays
                        disabledDays="afterToday"
                        onClick={dateItem => setDate(dateItem.date)}
                        date={date}
                    />
                    <SelectProfessional
                        professionals={professionals}
                        selectedProfessional={selectedProfessional}
                        setSelectedProfessional={setSelectedProfessional as React.Dispatch<React.SetStateAction<ProfessionalSettings | ProfessionalData>>}
                    />
                    <SimpleTabs
                        tabs={tabs}
                        activeTab={currentTab}
                        setActiveTab={setCurrentTab}
                    />
                    <EventHistory
                        currentTab={currentTab}
                        events={currentEvents}
                    />
                </div>
            </div>
            {openModal === 'ScheduleMonths' &&
                <ScheduleSelect
                    type="month"
                    date={date}
                    onChangeDate={onChangeDate} 
                />
            }
            {openModal === 'ScheduleYears' &&
                <ScheduleSelect
                    type="year"
                    date={date}
                    onChangeDate={onChangeDate} 
                    yearLimit={foundationYear} 
                />
            }
        </>
    )
}