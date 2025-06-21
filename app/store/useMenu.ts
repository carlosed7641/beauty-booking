import { create } from 'zustand'

interface Store {
    isOpenMenu: boolean
    setIsOpenMenu: (isOpenMenu: boolean) => void
}

export const useMenu = create<Store>()((set) => ({
    isOpenMenu: false,
    setIsOpenMenu: (isOpenMenu: boolean) => set({ isOpenMenu })
}))