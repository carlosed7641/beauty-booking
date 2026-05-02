import Link from 'next/link'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

export const Professionals = ({ professionals }: { professionals: ProfessionalSchedule[] }) => {
  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-7 md:gap-3 mt-4">
      {
        professionals.map(p => (
          <Link href={`/professional/${p.id}`} className="flex flex-col gap-2 items-center cursor-pointer" key={p.id}>
            {
              p.photo ?
                <Image className="rounded-full aspect-square" src={p.photo} alt={p.name} width={150} height={150} />
                :
                <div className="bg-green-700 text-white text-7xl rounded-full aspect-square flex justify-center items-center w-full h-full max-h-37.5 max-w-37.5">
                  {p.name[0]}
                </div>
            }
            <div className="flex flex-col items-center">
              <p className="font-bold">{p.name}</p>
              {
                p?.reviews?.count
                  ?
                  p?.reviews?.count > 0 &&
                  <div className="flex my-1">
                    {Array.from({ length: Math.round(p.reviews.points) }, (_, i) => (
                      <FaStar key={i} className="text-amber-300" />
                    ))}
                  </div>
                  : null
              }
              <span className="text-zinc-500">{
                p?.reviews?.count ?
                  p?.reviews?.count > 0 ? `${p.reviews.count} reseñas` : 'No hay reseñas'
                  : 'No hay reseñas'
              }</span>
            </div>
          </Link>
        ))
      }
    </div>
  )
}