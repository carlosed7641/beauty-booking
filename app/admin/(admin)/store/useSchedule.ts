import { create } from 'zustand'
import { View } from 'react-big-calendar'

interface ScheduleState {
    date: Date
    view: View
    selectedEvent: EventDate | null
}

interface Store {
    schedule: ScheduleState
    setSchedule: (step: ScheduleState) => void
}

export const useSchedule = create<Store>()((set) => ({
    schedule: {
        date: new Date(),
        view: 'day',
        selectedEvent: null
    },
    setSchedule: (schedule: ScheduleState) => set({ schedule })
}))
