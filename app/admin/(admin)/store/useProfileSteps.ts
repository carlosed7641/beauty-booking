import { create } from 'zustand'

type ImageKeys = 'logo' | 'cover'

interface Data {
    name: string
    description?: string
    types: string[]
    images: Record<ImageKeys, string | null>
    address: string
    addressDetail: string
}

interface Store {
    step: number
    setStep: (step: number) => void
    data: Data
    setData: (data: Data) => void
    showErrors: boolean
    setShowErrors: (showErrors: boolean) => void
}

export const useProfileSteps = create<Store>()((set) => ({
    step: 0,
    data: {
        name: 'Acicalate Vip',
        description: '',
        types: ['Barbería', 'Peluquería', 'Tatuajes'],
        images: {
            logo: null,
            cover: null
        },
        address: 'Calle 123',
        addressDetail: ''
    },
    showErrors: false,
    setStep: (step: number) => set({ step }),
    setData: (data: Data) => set({ data }),
    setShowErrors: (showErrors: boolean) => set({ showErrors })
}))
