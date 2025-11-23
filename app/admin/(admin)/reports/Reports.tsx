'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useModal } from '@/store'
import { OptionsSelector, SimpleTabs } from '@/components'
import { DateRangeModal, DateSwitcher, GeneralReportsPanel, SalesReportsPanel, SelectProfessional } from '../components'
import { formatInputDate } from '@/helpers'
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

const todayFormatDate = formatInputDate(new Date())

interface Props { foundationDate: Date, events: EventDate[], professionals: ProfessionalData[] }

export const Reports = ({ foundationDate, events, professionals }: Props) => {

    const [activeOptionDate, setActiveOptionDate] = useState<TimeOptionItem>(timeOptions[0])
    const [dateRange, setDateRange] = useState<Date[]>(INITIAL_DATES)
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalData>(DEFAULT_PROFESSIONAL)
    const [dataSummary, setDataSummary] = useState<ReportDataSummary>({ ...DEFAULT_REPORT_DATA_SUMMARY })
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [customRange, setCustomRange] = useState(dateRange)
    const { openModal } = useModal()

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

    useEffect(() => {
        if (activeOptionDate.id === 'range') setCustomRange(dateRange)
        else setDateRange(getDateRange(activeOptionDate.id))
    }, [activeOptionDate])

    useEffect(() => {
        // TODO: This will be created on the server side (backend)
        const getData = (dateRange: Date[], professionalId: string) => {
            const [start, end] = dateRange.map(date => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime())

            const filteredData = events.filter(event => {
                const eventDate = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate()).getTime()

                return professionalId
                    ? event.selectedProfessional.id === professionalId && eventDate >= start && eventDate <= end
                    : eventDate >= start && eventDate <= end
            })

            let totalServiceTime = 0
            let abortedEvents = 0
            let cancelledEvents = 0
            const servicesCount: Record<string, number> = {}
            const professionalTotalSelling: Record<string, number> = {}
            const customerSet = new Set<string>()

            const dataSummary = filteredData.reduce((acc, event) => {

                const {
                    selectedService,
                    selectedProfessional: { id: profId, name: profName, photo },
                    status,
                    isAdminBooking,
                    customer
                } = event

                const { serviceId, name: serviceName, duration, price } = selectedService

                isAdminBooking ? acc.adminScheduling++ : acc.manualScheduling++

                switch (status) {
                    case 'completed':
                        totalServiceTime += duration.hours * 60 + duration.minutes
                        acc.totalSales += price
                        acc.completedServices += 1

                        acc.averageServiceTime = Math.round(totalServiceTime / acc.completedServices)
                        acc.averageServiceValue = Math.round(acc.totalSales / acc.completedServices)

                        // all professionals selected
                        if (!selectedProfessional.id) {
                            // Best selling professional
                            professionalTotalSelling[profId] = (professionalTotalSelling[profId] || 0) + price

                            if (professionalTotalSelling[profId] > acc.bestSellingProfessional.count) {

                                acc.bestSellingProfessional = {
                                    count: professionalTotalSelling[profId],
                                    data: { id: profId, name: profName, photo: photo ?? '' }
                                }
                            }
                        }

                        // Best selling service
                        servicesCount[serviceId] = (servicesCount[serviceId] || 0) + 1

                        if (servicesCount[serviceId] > acc.bestSellingService.count) {
                            acc.bestSellingService = { name: serviceName, count: servicesCount[serviceId] }
                        }

                        // Unique customers
                        if (customer.id && !customerSet.has(customer.id)) {
                            acc.totalCustomers++
                            customerSet.add(customer.id)
                        }

                        const existingService = acc.groupSales.find(s => s.id === serviceId)

                        if (existingService) {
                            existingService.quantity += 1
                            existingService.total += price
                        } else {
                            acc.groupSales.push({ id: serviceId, name: serviceName, quantity: 1, total: price });
                        }

                        acc.groupSales = acc.groupSales.sort((s1, s2) => s2.total - s1.total)

                        break
                    case 'aborted':
                        abortedEvents++
                        acc.abortedRate = parseFloat(((abortedEvents / filteredData.length) * 100).toFixed(1))
                        break
                    case 'cancelled':
                        cancelledEvents++
                        acc.cancellationRate = parseFloat(((cancelledEvents / filteredData.length) * 100).toFixed(1))
                        break
                }

                return acc
            }, structuredClone(DEFAULT_REPORT_DATA_SUMMARY))

            return dataSummary
        }

        setIsLoadingData(true)
        setTimeout(() => {
            const data = getData(dateRange, selectedProfessional.id)
            setDataSummary(data)
            setIsLoadingData(false)
        }, 1300) //TODO: Remove this

    }, [dateRange, activeOptionDate, selectedProfessional])

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
                        setSelectedProfessional={setSelectedProfessional as React.Dispatch<React.SetStateAction<ProfessionalSettings | ProfessionalData>>}
                        allOption
                    />
                    {
                        activeTab === 'general' &&
                        <GeneralReportsPanel
                            isLoading={isLoadingData}
                            dataSummary={dataSummary}
                            selectedProfessionalId={selectedProfessional.id}
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