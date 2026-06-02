import Link from 'next/link'
import Image from 'next/image'
import { Title } from '@/components'
import { StarQuantity } from '..'

interface Props {
    favorites: {
        numberId: number
        imageSrc: string | null
        name: string | null
        reviews: {
            points: number
            counts: number
        }
    }[]
}

export const FavoriteEntites = ({ favorites }: Props) => {

    return (
        <div className="mb-6">
            <Title title="Tus favoritos" />
            <ul className="flex md:flex-wrap gap-2 overflow-x-scroll md:overflow-hidden scroll-none -mr-2 md:mr-0">
                {

                    favorites.map(f => (
                        <li className="shrink-0 w-[90%] md:w-auto" key={f.numberId}>
                            <Link className="flex items-center bg-[#e8f7ea] md:w-87.5" href={`/entity/${f.numberId}`}>
                                <Image className="bg-white" src={f.imageSrc ?? '/images/placeholder.jpg'} alt={f.name ?? ''} width={140} height={140} />
                                <div className="p-2">
                                    <p>{f.name}</p>
                                    {
                                        f.reviews.counts > 0 &&
                                        <>
                                            <StarQuantity points={f.reviews.points} />
                                            <p className="text-zinc-500">{f.reviews.counts} reseñas</p>
                                        </>
                                    }
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <Link className="mt-3 flex justify-end md:justify-start underline text-green-700" href="/favorite-entities">Ver todos</Link>
        </div>
    )
}