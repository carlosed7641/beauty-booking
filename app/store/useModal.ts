import { create } from 'zustand'

interface Store {
    openModal: string | null
    setOpenModal: (openedModal: string | null) => void
}

export const useModal = create<Store>()((set) => ({
    openModal: null,
    setOpenModal: (openModal: string | null) => set({ openModal })
}))