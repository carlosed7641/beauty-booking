import { create } from 'zustand'
import { SERVICE_INITIAL_DATA } from '@/util/const'

interface Store {
    serviceFormData: ServiceFormData
    errors: Partial<Record<keyof ServiceFormData | 'duration', string>>
    touched: Partial<Record<keyof ServiceFormData, boolean>>
    setServiceFormData: (sserviceFormDataep: ServiceFormData) => void
    setErrors: (errors: Partial<Record<keyof ServiceFormData | 'duration', string>>) => void
    setTouched: (touched: Partial<Record<keyof ServiceFormData, boolean>>) => void
}

export const useServiceFormData = create<Store>()((set) => ({
    serviceFormData: SERVICE_INITIAL_DATA,
    errors: {},
    touched: {},
    setServiceFormData: (serviceFormData: ServiceFormData) => set({ serviceFormData }),
    setErrors: (errors: Partial<Record<keyof ServiceFormData | 'duration', string>>) => set({ errors }),
    setTouched: (touched: Partial<Record<keyof ServiceFormData, boolean>>) => set({ touched })
}))
