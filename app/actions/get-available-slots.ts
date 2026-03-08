'use server'

import prisma from "@/lib/prisma"

interface Props {
    workday: WorkDays
    date: Date
    serviceDuration: number
    professionalId: string
}

export const getAvailableSlots = async ({
    workday,
    date,
    serviceDuration,
    professionalId
}: Props) => {

    if (!workday) return []

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
    // endOfDay.setHours(23, 59, 59, 999)
    endOfDay.setDate(endOfDay.getDate() + 1)

    const events = await prisma.event.findMany({
        where: {
            professionalId,
            start: {
                gte: startOfDay,
                lte: endOfDay
            }
        }
    })


    const slots: Date[] = []
    let current = new Date(start)

    while (current.getTime() + serviceDuration * 60000 <= end.getTime()) {
        if (!isSlotOccupied(current, serviceDuration, events)) {
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

const format12 = (date: Date) => {
    const hours = date.getHours()
    const mins = date.getMinutes()

    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHour = hours % 12 === 0 ? 12 : hours % 12
    const displayMinutes = mins.toString().padStart(2, '0')

    return `${displayHour}:${displayMinutes} ${period}`
}

const format24 = (date: Date): string => {
    const h = date.getHours().toString().padStart(2, '0')
    const m = date.getMinutes().toString().padStart(2, '0')
    return `${h}:${m}`
}

const roundToNextInterval = (date: Date, interval: number) => {
    const minutes = date.getMinutes()
    const remainder = minutes % interval

    if (remainder === 0) return date

    const diff = interval - remainder
    const rounded = new Date(date)
    rounded.setMinutes(minutes + diff, 0, 0)

    return rounded
}