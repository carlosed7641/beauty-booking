import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Store {
    selectedFilters: string[]
    setSelectedFilters: (selectedFilters: string[]) => void
}

export const useSelectedFilters = create<Store>()(
    persist(
        (set) => ({
            selectedFilters: [],
            setSelectedFilters: (selectedFilters: string[]) => set({ selectedFilters })
        }), { name: 'filter-storage' }
    )
)