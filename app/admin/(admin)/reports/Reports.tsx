'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useModal } from '@/store'
import { getEventsDataByRange } from '@/actions'
import { OptionsSelector, SimpleTabs } from '@/components'
import { DateRangeModal, DateSwitcher, GeneralReportsPanel, SalesReportsPanel, SelectProfessional } from '../components'
import { DEFAULT_PROFESSIONAL, DEFAULT_REPORT_DATA_SUMMARY } from '@/util/const'

const timeOptions: TimeOptionItem[] = [
    { id: 'day', label: 'Día' },
    { id: 'week', label: 'Semana' },
    { id: 'fortnight', label: 'Quincena' },
    { id: 'month', label: 'Mes' },
    { id: 'year', label: 'Año' },
    { id: 'range', label: 'Rango' }
]

const tabs = [{ id: 'general', label: 'Generales' }, { id: 'sales', label: 'Ventas' }]

const INITIAL_DATES = [new Date(), new Date()]

interface Props {
    foundationDate: Date,
    professionals: ProfessionalData[]
    entityId: string
}

const getDateRange = (optionId: TimeOption) => {
    const today = new Date()

    switch (optionId) {
        case 'day':
            return [today, today]

        case 'week': {
            const startDate = new Date(today)
            const day = (today.getDay() + 6) % 7

            startDate.setDate(today.getDate() - day)

            const endDate = new Date(startDate)
            endDate.setDate(startDate.getDate() + 6)
            return [startDate, endDate]
        }

        case 'fortnight': {
            const startDate = new Date(today)
            const endDate = new Date(today)
            const isSecondHalf = today.getDate() > 15

            startDate.setDate(isSecondHalf ? 16 : 1)
            const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
            endDate.setDate(isSecondHalf ? lastDay : 15)

            return [startDate, endDate]
        }

        case 'month': {
            const startDate = new Date(today.getFullYear(), today.getMonth(), 1)
            const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
            return [startDate, endDate]
        }

        case 'year': {
            const year = today.getFullYear()
            const startDate = new Date(year, 0, 1)
            const endDate = new Date(year, 11, 31)
            return [startDate, endDate]
        }

        default:
            return [today, today]
    }
}

export const Reports = ({ foundationDate, professionals, entityId }: Props) => {

    const [activeOptionDate, setActiveOptionDate] = useState<TimeOptionItem>(timeOptions[0])
    const [dateRange, setDateRange] = useState<Date[]>(INITIAL_DATES)
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalData>(DEFAULT_PROFESSIONAL)
    const [dataSummary, setDataSummary] = useState<ReportDataSummary>({ ...DEFAULT_REPORT_DATA_SUMMARY })
    const [customRange, setCustomRange] = useState(dateRange)
    const [isLoadingData, setIsLoadingData] = useState(true)
    const openModal = useModal(state => state.openModal)


    useEffect(() => {
        if (activeOptionDate.id === 'range') setCustomRange(dateRange)
        else setDateRange(getDateRange(activeOptionDate.id))
    }, [activeOptionDate])

    useEffect(() => {

        setIsLoadingData(true)

        const getData = async () => {
            const dbData = await getEventsDataByRange({
                dateRange: [dateRange[0], dateRange[1]],
                professionalId: selectedProfessional?.id ?? null,
                entityId
            })

            setDataSummary(dbData)
            setIsLoadingData(false)
        }

        getData()

    }, [dateRange, selectedProfessional])

    useEffect(() => {
        if (!openModal) {
            setCustomRange(dateRange)
        }
    }, [openModal])


    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <Link href="/admin" title="Volver">
                    <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                </Link>
                <h1 className="text-lg text-green-700 font-bold">Informes</h1>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative flex flex-col gap-6">
                    <OptionsSelector
                        options={timeOptions}
                        activeOption={activeOptionDate}
                        setActiveOption={setActiveOptionDate as React.Dispatch<React.SetStateAction<{ id: string, label: string }>>}
                    />
                    <DateSwitcher
                        activeOption={activeOptionDate}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                        foundationDate={foundationDate}
                    />
                    <SimpleTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        tabs={tabs}
                    />
                    <SelectProfessional
                        professionals={professionals}
                        selectedProfessional={selectedProfessional}
                        setSelectedProfessional={setSelectedProfessional as () => void}
                        allOption
                    />
                    {
                        activeTab === 'general' &&
                        <GeneralReportsPanel
                            isLoading={isLoadingData}
                            dataSummary={dataSummary}
                            selectedProfessionalId={selectedProfessional?.id ?? null}
                        />
                    }
                    {
                        activeTab === 'sales' &&
                        <SalesReportsPanel
                            isLoading={isLoadingData}
                            totalSales={dataSummary.totalSales}
                            completedServices={dataSummary.completedServices}
                            groupSales={dataSummary.groupSales}
                        />
                    }
                </div>
            </div>
            {openModal === 'DateRange' &&
                <DateRangeModal
                    customRange={customRange}
                    setCustomRange={setCustomRange}
                    setDateRange={setDateRange}
                    limitDate={foundationDate}
                />
            }
        </>
    )
}