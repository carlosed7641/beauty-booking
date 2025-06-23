import Image from 'next/image'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'

interface Props { 
    ref: React.Ref<HTMLAnchorElement>
    entity: Entity 
}

export const EntitySearchCard = ({ ref, entity }: Props) => {
    return (
        <Link ref={ref} href={`/entity/${entity.id}`} className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-100 border-t border-zinc-200 focus:bg-zinc-100">
            <Image src={entity.imageSrc} width={50} height={50} alt={entity.name} />
            <div>
                <p>{entity.name}</p>
                <div className="bg-white w-fit round-md flex gap-2 items-center px-2 py-1 rounded-md border text-xs border-zinc-500">
                    <FaStar className="text-amber-300" />
                    <p className="leading-0">{entity.reviews.points ? `${entity.reviews.points} (${entity.reviews.counts})` : 'No hay reseñas'}</p>
                </div>
            </div>
        </Link>
    )
}
