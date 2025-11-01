import { create } from 'zustand'

interface Store {
    openModal: string | null | boolean
    setOpenModal: (openedModal: boolean | string | null) => void
}

export const useModal = create<Store>()((set) => ({
    openModal: null,
    setOpenModal: (openModal: boolean | string | null) => set({ openModal })
}))