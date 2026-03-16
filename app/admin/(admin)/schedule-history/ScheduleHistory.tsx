'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GoQuestion, GoCheck } from 'react-icons/go'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { ImSpinner8 } from 'react-icons/im'
import { TbReload } from 'react-icons/tb'
import { useEvents, useModal } from '@/store'
import { getEventsByMonth } from '@/actions'
import { SimpleTabs } from '@/components'
import { CustomDays, ScheduleSelect, SelectProfessional, EventHistory } from '../components'
import { compareDates } from '@/helpers'

const tabs = [
    { id: 'all', label: 'Todas' },
    { id: 'no-rated', label: 'Reservas sin calificar', icon: GoQuestion },
    { id: 'rated', label: 'Reservas Efectivas', icon: GoCheck }
]

interface Props {
    professionals: ProfessionalData[]
    foundationYear: number
    entityId: string
}

export function ScheduleHistory({ professionals, foundationYear, entityId }: Props) {

    const [date, setDate] = useState(new Date())
    const [currentTab, setCurrentTab] = useState('all')
    const events = useEvents(state => state.events)
    const setEvents = useEvents(state => state.setEvents)
    const [currentEvents, setCurrentEvents] = useState<EventDate[]>([])
    const [selectedProfessional, setSelectedProfessional] = useState(professionals[0])
    const [isLoadingEvents, setIsLoadingEvents] = useState(true)
    const [lastReload, setLastReload] = useState(new Date())
    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)

    const onChangeDate = (value: number, type: 'month' | 'year') => {
        setDate(prev => {
            const newDate = new Date(prev)
            type === 'year' ? newDate.setFullYear(value) : newDate.setMonth(value)
            return newDate
        })

        setOpenModal(null)
    }

    useEffect(() => {
        setIsLoadingEvents(true)
        const fetchEvents = async () => {
            const dbEvents = await getEventsByMonth(date, entityId)
            setEvents(dbEvents)
            setIsLoadingEvents(false)
        }

        fetchEvents()

    }, [date.getMonth(), date.getFullYear(), lastReload])

    useEffect(() => {
        if (!events.length) return

        const currentEvents = events.filter(e =>
            e.selectedProfessional.id === selectedProfessional?.id
            && compareDates(date, e.start)
        ).sort((a, b) => a.start.getTime() - b.start.getTime())

        setCurrentEvents(currentEvents)

    }, [events, date, selectedProfessional])

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
                    <button onClick={() => setLastReload(new Date())} disabled={isLoadingEvents}
                        className="flex ml-auto w-fit text-green-700 text-3xl mb-1.5 cursor-pointer disabled:opacity-65 disabled:pointer-events-none md:mb-0" >
                        <TbReload />
                    </button>
                    <CustomDays
                        disabledDays="afterToday"
                        onClick={dateItem => setDate(dateItem.date)}
                        date={date}
                    />

                    {
                        isLoadingEvents ?
                            <div className="h-screen! md:h-125! flex justify-center items-center">
                                <div className="flex flex-col items-center justify-center gap-2.5">
                                    <ImSpinner8 className="text-4xl text-green-700 animate-spin" />
                                    Cargando agendas...
                                </div>
                            </div>
                            :
                            <>
                                <SelectProfessional
                                    professionals={professionals}
                                    selectedProfessional={selectedProfessional}
                                    setSelectedProfessional={setSelectedProfessional as () => void}
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
                            </>
                    }

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