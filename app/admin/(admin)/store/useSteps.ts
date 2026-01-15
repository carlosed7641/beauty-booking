import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { INITIAL_WORK_DAYS } from '@/util/const'

interface Data {
    name: string | undefined
    address: string | undefined,
    reference?: string | undefined
    types: string[]
    selectedServices: {
        [key: string]: ServiceData[]
    } | null
    workdays: WorkDays[]
}

interface Store {
    step: number
    setStep: (step: number) => void
    showErrors: boolean,
    setShowErrors: (showErrors: boolean) => void
    completedSteps: number
    setCompletedSteps: (completedSteps: number) => void
    data: Data
    setData: (data: Data) => void
}

export const useSteps = create<Store>()(
    persist(
        (set) => ({
            step: 0,
            showErrors: false,
            completedSteps: 0,
            data: {
                name: undefined,
                address: undefined,
                types: [],
                selectedServices: null,
                workdays: INITIAL_WORK_DAYS
            },
            setStep: (step: number) => set({ step }),
            setShowErrors: (showErrors: boolean) => set({ showErrors }),
            setCompletedSteps: (completedSteps: number) => set({ completedSteps }),
            setData: (data: Data) => set({ data })
        }), { name: 'steps-data' }
    )
)