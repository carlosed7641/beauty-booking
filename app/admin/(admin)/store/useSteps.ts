import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type StepOneData = {
    name: string | null
    address: string | null,
    reference?: string | null
    types: string[]
}

interface Store {
    step: number
    setStep: (step: number) => void
    showErrors: boolean,
    setShowErrors: (showErrors: boolean) => void
    completedSteps: number
    setCompletedSteps: (completedSteps: number) => void
    stepOneData: StepOneData
    setStepOneData: (data: StepOneData) => void
}

export const useSteps = create<Store>()(
    persist(
        (set) => ({
            step: 0,
            showErrors: false,
            completedSteps: 0,
            stepOneData: {
                name: null,
                address: null,
                types: []
            },
            setStep: (step: number) => set({ step }),
            setShowErrors: (showErrors: boolean) => set({ showErrors }),
            setCompletedSteps: (completedSteps: number) => set({ completedSteps }),
            setStepOneData: (data: StepOneData) => set({ stepOneData: data })
        }), { name: 'steps-data' }
    )
)