import { Metadata } from 'next'
import { auth } from '@/auth.config'
import { Emotion } from '@/components'
import { formatDate } from '@/helpers'
import prisma from '@/lib/prisma'
import { RiEmotionHappyLine } from 'react-icons/ri'

export const metadata: Metadata = {
  title: 'Mi reputación'
}

export default async function MyReputationPage() {

  const session = await auth()

  if (!session) {
    return (
      <div className="flex flex-col items-center my-4 gap-3">
        <RiEmotionHappyLine className="text-5xl" />
        <p className="text-xl text-center">Ningún profesional te ha dejado calificaciones aún</p>
      </div>
    )
  }


  const data = await prisma.user.findFirst({
    where: {
      id: session.user?.id
    },
    select: {
      customers: {
        select: {
          events: {
            where: {
              professionalRating: { not: null }
            },
            select: {
              id: true,
              professionalRating: true,
              professionalRatedAt: true,
              professional: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  })

  const events = data?.customers.flatMap(({ events }) => events) ?? []

  const totalPoints = events.reduce((sum, pr) => sum + (pr.professionalRating ?? 0), 0)
  const averagePoints = events.length > 0
    ? totalPoints / events.length
    : 0
  const reputationLevel = averagePoints >= 2.5 ? 'Buena' : averagePoints >= 1.5 ? 'Regular' : 'Mala'

  return (
    <>
      <div className="flex flex-col gap-2 items-center md:items-start my-4">
        <h1 className="text-2xl text-green-700">
          Mi reputación
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <h2>Tu reputación es {reputationLevel.toLocaleLowerCase()}</h2>
          <Emotion averagePoints={averagePoints} />
        </div>
      </div>
      <ul className="flex flex-col gap-5">
        {events.map(rp => (
          <li className="flex gap-5 items-center justify-between px-2 md:px-0" key={rp.id}>
            <div className="flex flex-col">
              <p className="text-green-700">{rp.professional.name}</p>
              <p className="text-zinc-500">
                {(rp.professionalRating ?? 0) >= 2.5 ? 'Llegó a tiempo' : (rp.professionalRating ?? 0) >= 1.5 ? 'Llegó tarde' : 'No llegó'}
              </p>
              {rp.professionalRatedAt && <p className="text-zinc-500">Creado el {formatDate({ date: rp.professionalRatedAt, month: 'numeric' })}</p>}
            </div>
            <Emotion averagePoints={rp.professionalRating ?? 1} />
          </li>
        ))}
      </ul>
    </>
  )
}