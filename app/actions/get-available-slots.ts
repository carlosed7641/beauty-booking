'use server'

import prisma from '@/lib/prisma'
import { format12, format24, roundToNextInterval } from '@/helpers'

interface Props {
    workday: WorkDays
    date: Date
    serviceDuration: number
    professionalId: string,
    editingEventId?: string
}

export const getAvailableSlots = async ({
    workday,
    date,
    serviceDuration,
    professionalId,
    editingEventId
}: Props) => {

    if (!workday) return []

    const inputDate = new Date(date)
    const today = new Date()

    today.setHours(0, 0, 0, 0)
    inputDate.setHours(0, 0, 0, 0)

    if (inputDate < today) return []

    const start = new Date(date)
    const end = new Date(date)

    const [startHour, startMinute] = workday.from.split(':').map(Number)
    const [endHour, endMinute] = workday.to.split(':').map(Number)

    start.setHours(startHour, startMinute, 0, 0)
    end.setHours(endHour, endMinute, 0, 0)

    const interval = 15

    const now = new Date()

    if (date.toDateString() === now.toDateString() && now > start) {
        const roundedNow = roundToNextInterval(now, interval)

        if (roundedNow > start) {
            start.setHours(
                roundedNow.getHours(),
                roundedNow.getMinutes(),
                0,
                0
            )
        }
    }

    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(startOfDay)
    endOfDay.setDate(endOfDay.getDate() + 1)

    const events = await prisma.event.findMany({
        where: {
            professionalId,
            start: {
                gte: startOfDay,
                lte: endOfDay
            },
            status: {
                not: 'cancelled'
            }
        }
    })

    const filteredEvents = editingEventId
        ? events.filter(e => e.id !== editingEventId)
        : events

    const slots: Date[] = []
    let current = new Date(start)

    while (current.getTime() + serviceDuration * 60000 <= end.getTime()) {
        if (!isSlotOccupied(current, serviceDuration, filteredEvents)) {
            slots.push(new Date(current))
        }
        current.setMinutes(current.getMinutes() + interval)
    }

    return slots.map(slot => (
        {
            label: format12(slot),
            value: format24(slot)
        }
    ))
}

const isSlotOccupied = (
    slotStart: Date,
    serviceDuration: number,
    events: { start: Date; end: Date }[]
) => {

    const slotEnd = new Date(slotStart.getTime() + serviceDuration * 60000)

    return events.some(event => {

        const eventStart = new Date(event.start)
        const eventEnd = new Date(event.end)

        return (
            slotStart < eventEnd &&
            slotEnd > eventStart
        )
    })
}
