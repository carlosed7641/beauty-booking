import Image from 'next/image'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'

interface Props {
  result: Entity[]
  view: ResultView
}

export const SearchResult = ({ result, view }: Props) => {
  return (
    <div className={view.class}>
      {result.map((r) => (
        <Link key={r.id} href={`/entity/${r.id}`} className={view.container}>
          <Image
            src={r.imageSrc}
            alt={r.name}
            width={view.imageSize.width}
            height={view.imageSize.height}
          />
          <div className={`flex p-3 bg-[#e8f7ea] flex-wrap ${view.info}`}>
            <p className="font-bold">{r.name}</p>
            <div className="flex gap-2 items-center bg-white p-0.5 rounded-md border border-zinc-300">
              <FaStar className="text-amber-300" />
              {r.reviews.points
                ? `${r.reviews.points} (${r.reviews.counts})`
                : "No hay reseñas"}
            </div>
            <p className="mt-2 text-zinc-600  ">A 1k de ti</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
