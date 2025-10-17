'use client'

import { useEffect, useRef, useState } from 'react'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { useModal } from '@/store'
import { DateList } from '@/components'
import { generateMonthDatesArray } from '@/helpers'
import { MONTHS_OF_YEAR } from '@/util/const'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

const INITIAL_DAYS_OF_MONTH = generateMonthDatesArray(new Date())
interface Props {
    onClick: (dayItem: DateItem) => void
    disabledDays?: 'afterToday' | 'none'
    date: Date
    className?: string
}

export const CustomDays = ({
    onClick,
    disabledDays,
    date,
    className
}: Props) => {

    const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState(INITIAL_DAYS_OF_MONTH)
    const { setOpenModal } = useModal()
    const el = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const scrollSkip = (direction: 'left' | 'right') => {
        if (el.current) {
            const elDiv = el.current
            const clientWidth = elDiv.clientWidth
            const scrollOffset = direction === 'left' ? -clientWidth  : clientWidth
            elDiv.scrollBy({ left: scrollOffset, behavior: 'smooth' })
        }
    }

    const updateScrollButtons = () => {
        if (el.current) {
            const elDiv = el.current
            const clientWidth = elDiv.clientWidth
            const scrollLeft = elDiv.scrollLeft
            const scrollWidth = elDiv.scrollWidth

            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
        }
    }

    useEffect(() => {
        const elDiv = el.current
        if (!elDiv) return

        const handleScroll = () => {
            updateScrollButtons()
        }

        elDiv.addEventListener('scroll', handleScroll)
        return () => {
            elDiv.removeEventListener('scroll', handleScroll)
        }
    }, [])
    

    useEffect(() => {
        const newDays = generateMonthDatesArray(date)
        setDaysOfCurrentMonth(newDays)
    }, [date.getMonth(), date.getFullYear()])

    return (
        <div className={`${className ? className : ''}`}>
            <div className="flex gap-3 justify-center">
                <button onClick={() => setOpenModal('ScheduleYears')} className="bg-green-700 py-0.5 px-3 rounded-full text-white flex gap-2 items-center cursor-pointer">
                    <LiaExchangeAltSolid />
                    {date.getFullYear()}
                </button>
                <button onClick={() => setOpenModal('ScheduleMonths')} className="bg-green-700 py-0.5 px-3 rounded-full text-white flex gap-2 items-center cursor-pointer">
                    <LiaExchangeAltSolid />
                    {MONTHS_OF_YEAR[date.getMonth()]}
                </button>
            </div>
            <div className="flex items-center gap-3">
                <button disabled={!canScrollLeft} onClick={() => scrollSkip('left')} className="hidden md:block bg-green-700 p-3 rounded-full text-white cursor-pointer hover:bg-green-800 disabled:opacity-70 disabled:pointer-events-none">
                    <FaArrowLeftLong />
                </button>
                <div ref={el} className="flex overflow-x-scroll scroll-none gap-2 md:mt-5">
                    <DateList
                        isAdmin
                        disabled={disabledDays}
                        datesList={daysOfCurrentMonth}
                        selectedDate={date}
                        onClick={onClick}
                    />
                </div>
                <button disabled={!canScrollRight} onClick={() => scrollSkip('right')} className="hidden md:block bg-green-700 p-3 rounded-full text-white cursor-pointer hover:bg-green-800 disabled:opacity-70 disabled:pointer-events-none">
                    <FaArrowRightLong />
                </button>
            </div>
        </div>
    )
}
