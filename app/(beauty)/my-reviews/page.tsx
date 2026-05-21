import prisma from '@/lib/prisma'
import { FaRegStar } from 'react-icons/fa'
import { ReviewItem } from '../components'
import { auth } from '@/auth.config'

export default async function MyReviewsPage() {

  const session = await auth()

  if (!session) {
    return (
      <p className="text-center my-4">Aún no hay reseñas</p>
    )
  }

  const data = await prisma.user.findFirst({
    where: {
      id: session?.user?.id
    },
    select: {
      customers: {
        select: {
          events: {
            where: {
              customerRating: {
                not: null
              }
            },
            select: {
              id: true,
              title: true,
              customerRating: true,
              customerRatedAt: true,
              professional: {
                select: {
                  name: true,
                  photo: true
                }
              }
            }
          }
        }
      }
    }
  })

  const events = data?.customers.flatMap(item => item.events) ?? []

  return (
    <>
      <h1 className="text-2xl text-green-700 my-4 flex gap-2 items-center">
        <FaRegStar />
        Mis reseñas
      </h1>
      {
        events.length > 0 ?
          <ul className="flex flex-col gap-3 md:gap-6">
            {events.map(event =>
              <ReviewItem
                key={event.id}
                date={event.customerRatedAt}
                name={event.professional.name ?? ''}
                photoUrl={event.professional.photo ?? undefined}
                serviceName={event.title}
                points={event.customerRating!}
              />)
            }
          </ul>
          :
          <p className="my-4">Aún no hay reseñas</p>
      }
    </>
  )
}