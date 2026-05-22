import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { auth } from '@/auth.config'
import { EntityCard } from '../components'
import { getReviews } from '@/helpers'

export const metadata: Metadata = {
  title: 'Negocios Seguidos'
}

export default async function FavoriteEntitiesPage() {

  const session = await auth()

  if (!session) {
    return (
      <p className="text-center my-4">Aún no sigues a ningún negocio</p>
    )
  }

  const data = await prisma.user.findFirst({
    where: { id: session?.user?.id },
    select: {
      followers: {
        select: {
          entity: {
            select: {
              id: true,
              numberId: true,
              logo: true,
              name: true,
              address: true,
              _count: {
                select: {
                  followers: true,
                  events: {
                    where: {
                      status: 'completed'
                    }
                  }
                }
              },
              events: {
                where: {
                  status: 'completed'
                },
                select: {
                  id: true,
                  customerRating: true
                }
              }
            }
          }
        }
      }
    }
  })

  const entities = data?.followers.flatMap(item => item.entity)

  if (entities?.length === 0) return <p className="text-center my-4">Aún no sigues a ningún negocio</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {
        entities?.map(entity => {

          const { ratingCount, ratingPotins } = getReviews(entity.events)

          const data = {
            ...entity,
            reviews: {
              points: ratingPotins,
              count: ratingCount,
            },
            userId: session?.user?.id,
            isFollowing: true
          }

          return (
            <EntityCard
              entity={data}
              key={entity.numberId}
              isAuthenticated={!!session}
            />
          )
        })
      }
    </div>
  )
}