import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type StepOneData = {
    name: string | null
    address: string | null,
    reference?: string | null
    types: string[]
}

interface workDays {
    from: string
    to: string
    disabled?: boolean
    error?: boolean
}

interface Data {
    stepOne: StepOneData
    selectedServices: {
        [key: string]: ServiceData[]
    } | null
    workdays: workDays[]
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
                stepOne: {
                    name: null,
                    address: null,
                    types: []
                },
                selectedServices: null,
                workdays: [
                    {
                        from: '9:00',
                        to: '21:00'
                    },
                    {
                        from: '9:00',
                        to: '21:00'
                    },
                    {
                        from: '9:00',
                        to: '21:00'
                    },
                    {
                        from: '9:00',
                        to: '21:00'
                    },
                    {
                        from: '9:00',
                        to: '21:00'
                    },
                    {
                        from: '9:00',
                        to: '21:00'
                    },
                    {
                        from: '9:00',
                        to: '21:00'
                    }
                ]
            },
            setStep: (step: number) => set({ step }),
            setShowErrors: (showErrors: boolean) => set({ showErrors }),
            setCompletedSteps: (completedSteps: number) => set({ completedSteps }),
            setData: (data: Data) => set({ data })
        }), { name: 'steps-data' }
    )
)