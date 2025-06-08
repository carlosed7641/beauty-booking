import { create } from 'zustand'
import { SERVICE_INITIAL_STATE } from '@/util/const'

type ServiceState = {
    selectedService: ServiceItem | null
    selectedProfessional: string | null
    selectedDate: string | null
    selectedHour: string | null
    isCompleted: boolean
}

interface Store {
    serviceState: ServiceState
    setServiceState: (serviceState: ServiceState) => void
}

export const useService = create<Store>()((set) => ({
    serviceState: SERVICE_INITIAL_STATE,
    setServiceState: (serviceState: ServiceState) => set({ serviceState })
}))