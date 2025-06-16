import Link from 'next/link'
import Image from 'next/image'
import { Title } from '@/components'
import { favoriteEntities } from '@/util/fake-data'
import { StarQuantity } from '../star-quantity/StarQuantity'

export const FavoriteEntites = () => {
    
    const favorites = favoriteEntities.slice(0, 2)
    return (
        <div className="mb-6">
            <Title title="Tus favoritos" />
            <ul className="flex md:flex-wrap gap-2 overflow-x-scroll md:overflow-hidden scroll-none -mr-2 md:mr-0">
                {
                        
                    favorites.map(f => (
                        <li className="shrink-0 w-[90%] md:w-auto" key={f.id}>
                            <Link className="flex items-center bg-[#e8f7ea] md:w-[350px]" href={`/entity/${f.id}`}>
                                <Image src={f.imageSrc} alt={f.name} width={140} height={140} />
                                <div className="p-2">
                                    <p>{f.name}</p>
                                    <StarQuantity points={f.reviews.points} />
                                    <p className="text-zinc-500">{f.reviews.counts} reseñas</p>
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
