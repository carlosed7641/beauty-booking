import Link from 'next/link'
import { SECTIONS_SETTINGS } from '@/util/const'

export const Sections = () => {
    return (
        <ul className="flex flex-col gap-4 r md:border-r border-zinc-200">
            {
                SECTIONS_SETTINGS.map(({ title, url, icon: Icon }) => (
                    <li key={title} className="flex items-center text-lg gap-2">
                        <Icon className="text-2xl text-green-700" />
                        <Link className="text-zinc-600 hover:text-green-700" href={url} title={title}>
                            {title}
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}
