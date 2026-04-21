'use client'

import { useRouter } from 'next/navigation'
import { IoStorefrontOutline } from 'react-icons/io5'
import { useSelectedFilters } from '@/store'

const icons: Record<string, React.JSX.Element> = {
    store: <IoStorefrontOutline className="text-5xl" />
}

interface Props {
    name: string
    iconId: string
}

export const CategoryCard = ({ name, iconId }: Props) => {

    const icon = icons[iconId]
    const router = useRouter()
    const setSelectedFilters = useSelectedFilters(state => state.setSelectedFilters)

    const handleClickCategory = (name: string) => {
        const normalizedName = name.toLocaleLowerCase()
        setSelectedFilters([normalizedName])
        router.push('/search/category')
    }

    return (
        <div
            onClick={() => handleClickCategory(name)}
            title={name}
            className="bg-[#e8f7ea] flex items-center rounded-lg p-5 flex-col shrink-0 gap-2 w-32 
             md:w-auto cursor-pointer transition-all hover:bg-green-600 hover:text-white"
        >
            {icon}
            <span className="font-bold">{name}</span>
        </div>
    )
}