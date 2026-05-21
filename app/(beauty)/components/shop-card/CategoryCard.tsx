'use client'

import { useRouter } from 'next/navigation'
import { useSelectedFilters } from '@/store'
import { SERVICE_ICONS } from '@/util/const'

interface Props {
    name: string
    iconId: string
}

export const CategoryCard = ({ name, iconId }: Props) => {

    const router = useRouter()
    const setSelectedFilters = useSelectedFilters(state => state.setSelectedFilters)
    const Icon = SERVICE_ICONS[iconId]

    const handleClickCategory = (name: string) => {
        setSelectedFilters([name])
        router.push('/search/category')
    }

    return (
        <div
            onClick={() => handleClickCategory(name)}
            title={name}
            className="bg-[#e8f7ea] flex items-center rounded-lg p-5 flex-col shrink-0 gap-2 w-32 
             md:w-auto cursor-pointer transition-all hover:bg-green-600 hover:text-white"
        >
            <Icon className="text-5xl" />
            <span className="font-bold">{name}</span>
        </div>
    )
}