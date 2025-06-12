import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { formatedDate } from '@/helpers'

interface Props {
    photoUrl?: string
    name: string
    points: number
    date: number
    serviceName: string
}

export const ReviewItem = ({ photoUrl, name, points, date, serviceName }: Props) => {
    return (
        <li className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-3" >
            {
                photoUrl ?
                    <Image
                        className="rounded-full"
                        src={photoUrl}
                        width={80}
                        height={80}
                        alt={name}
                    />
                : 
                <div className="flex items-center justify-center text-3xl h-20 w-20 rounded-full bg-green-700 text-white">
                    {name[0]}
                </div>
            }
            <div>
                <p>{name}</p>
                <div className="flex items-center text-amber-300">
                    <span className="text-2xl font-bold mr-1">{points}</span>
                    {Array.from({ length: points }, (_, i) => (
                        <FaStar key={i} />
                    ))}
                </div>
            </div>
            <p className="ml-auto text-sm text-zinc-500">{formatedDate(date)}</p>
            <div className='w-full text-sm'>
                Serivicio adquirido: {serviceName}
            </div>
        </li>
    )
}
