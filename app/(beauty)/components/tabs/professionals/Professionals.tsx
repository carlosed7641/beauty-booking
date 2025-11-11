import Link from 'next/link'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

export const Professionals = ({ professionals }: { professionals: ProfessionalData[] }) => {
  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-7 md:gap-3 mt-4">
      {
        professionals.map(p => (
          <Link href={`/professional/${p.id}`} className="flex flex-col gap-2 items-center cursor-pointer" key={p.id}>
            <Image className="rounded-full" src={p.photo ?? ''} alt={p.name} width={150} height={150} />
            <div className="flex flex-col items-center">
              <p className="font-bold">{p.name}</p>
              {
                p.reviews.count > 0 &&
                <div className="flex my-1">
                  {Array.from({ length: Math.round(p.reviews.points) }, (_, i) => (
                    <FaStar key={i} className="text-amber-300" />
                  ))}
                </div>
              }
              <span className="text-zinc-500">{p.reviews.count > 0 ? `(${p.reviews.count}) Ver reseñas` : 'No hay reseñas'}</span>
            </div>
          </Link>
        ))
      }
    </div>
  )
}