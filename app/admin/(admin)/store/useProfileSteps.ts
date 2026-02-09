import { create } from 'zustand'

interface Store {
    step: number
    setStep: (step: number) => void
    data: ShopProfile
    setData: (data: ShopProfile) => void
    showErrors: boolean
    setShowErrors: (showErrors: boolean) => void
}

export const useProfileSteps = create<Store>()((set) => ({
    step: 0,
    data: {
        name: '',
        shopType: [],
        images: {
            logo: null,
            cover: null
        },
        address: '',
        addressReference: ''
    },
    showErrors: false,
    setStep: (step: number) => set({ step }),
    setData: (data: ShopProfile) => set({ data }),
    setShowErrors: (showErrors: boolean) => set({ showErrors })
}))
