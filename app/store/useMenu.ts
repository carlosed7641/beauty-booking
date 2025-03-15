import { create } from 'zustand'

type MenuState = {
    isOpenMenu: boolean
    position: number
}

interface Store {
    menuState: MenuState
    setMenuState: (menuState: MenuState) => void
}

export const useMenu = create<Store>()((set) => ({
    menuState: {
        isOpenMenu: false,
        position: 0
    },
    setMenuState: (menuState: MenuState) => set({ menuState })
}))