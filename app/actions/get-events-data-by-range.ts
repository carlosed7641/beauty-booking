'use server'

import prisma from '@/lib/prisma'
import { DEFAULT_REPORT_DATA_SUMMARY } from '@/util/const'

interface Props {
    dateRange: [Date, Date]
    professionalId: string | null
    entityId: string
}

export const getEventsDataByRange = async ({ dateRange, professionalId, entityId }: Props): Promise<ReportDataSummary> => {

    const [gte, lte] = dateRange

    const events = await prisma.event.findMany({
        where: {
            start: {
                gte,
                lte
            },
            ...(professionalId && { professionalId }),
            entityId
        },
        include: {
            professional: {
                select: {
                    id: true,
                    name: true,
                    photo: true
                }
            },
            service: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    let totalServiceTime = 0
    let abortedEvents = 0
    let cancelledEvents = 0
    const servicesCount: Record<string, number> = {}
    const professionalTotalSelling: Record<string, number> = {}
    const customerSet = new Set<string>()

    const dataSummary = events.reduce((acc, event) => {

        const { status, typeBooking, durationHours, durationMinutes, price, professional, service, customerId } = event

        typeBooking !== 'user' ? acc.adminScheduling++ : acc.manualScheduling++

        switch (status) {
            case 'completed':
                totalServiceTime += durationHours * 60 + durationMinutes
                acc.totalSales += price
                acc.completedServices += 1

                acc.averageServiceTime = Math.round(totalServiceTime / acc.completedServices)
                acc.averageServiceValue = Math.round(acc.totalSales / acc.completedServices)

                // all professionals selected
                if (!professionalId) {
                    // Best selling professional
                    professionalTotalSelling[professional.id] = (professionalTotalSelling[professional.id] || 0) + price

                    if (professionalTotalSelling[professional.id] > acc.bestSellingProfessional.count) {

                        acc.bestSellingProfessional = {
                            count: professionalTotalSelling[professional.id],
                            data: { id: professional.id, name: professional.name ?? '', photo: professional.photo ?? '' }
                        }
                    }
                }

                // Best selling service
                servicesCount[service.id] = (servicesCount[service.id] || 0) + 1

                if (servicesCount[service.id] > acc.bestSellingService.count) {
                    acc.bestSellingService = { name: service.name, count: servicesCount[service.id] }
                }

                // Unique customers
                if (customerId && !customerSet.has(customerId)) {
                    acc.totalCustomers++
                    customerSet.add(customerId)
                }

                const existingService = acc.groupSales.find(s => s.id === service.id)

                if (existingService) {
                    existingService.quantity += 1
                    existingService.total += price
                } else {
                    acc.groupSales.push({ id: service.id, name: service.name, quantity: 1, total: price })
                }

                acc.groupSales = acc.groupSales.sort((s1, s2) => s2.total - s1.total)

                break
            case 'aborted':
                abortedEvents++
                acc.abortedRate = parseFloat(((abortedEvents / events.length) * 100).toFixed(1))
                break
            case 'cancelled':
                cancelledEvents++
                acc.cancellationRate = parseFloat(((cancelledEvents / events.length) * 100).toFixed(1))
                break
        }

        return acc
    }, structuredClone(DEFAULT_REPORT_DATA_SUMMARY))

    return dataSummary

}