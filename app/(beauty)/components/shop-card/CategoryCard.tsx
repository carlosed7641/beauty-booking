import Link from 'next/link'
import { IoStorefrontOutline } from 'react-icons/io5'

const icons:  Record<string, React.JSX.Element> = {
    store: <IoStorefrontOutline className="text-5xl" />
}

interface Props {
    name: string
    href: string
    iconId: string
}

export const CategoryCard = ({ name, href, iconId }: Props) => {

    const icon = icons[iconId]

    return (
        <Link href={href}
            title={name}
            className="bg-[#e8f7ea] flex items-center rounded-lg p-5 flex-col shrink-0 gap-2 w-32 
             md:w-auto cursor-pointer transition-all hover:bg-green-600 hover:text-white"
        >
            {icon}
            <span className="font-bold">{name}</span>
        </Link>
    )
}
