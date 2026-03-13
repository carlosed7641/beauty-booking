import { create } from 'zustand'

interface Store {
    events: EventDate[]
    setEvents: (events: EventDate[]) => void
}

export const useEvents = create<Store>()((set) => ({
    events: [],
    setEvents: (events: EventDate[]) => set({ events })
}))
