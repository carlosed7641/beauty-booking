import type { Metadata } from 'next'
import { Fragment } from 'react'
import { EntityCard } from '../components'
import { searchEntity } from '@/actions'
import { auth } from '@/auth.config'
import { getReviews } from '@/helpers'
import prisma from '@/lib/prisma'

interface Props {
  searchParams: Promise<{ q: string }>
}

export async function generateMetadata(
  { searchParams }: Props
): Promise<Metadata> {

  const { q } = await searchParams

  return {
    title: q ?? 'Negocios',
  }
}

export default async function EntitiesPage({ searchParams }: Props) {

  const { q } = await searchParams
  const session = await auth()


  const normalizedQuery = q?.toLowerCase() || ''

  const { results } = await searchEntity(normalizedQuery)

  let userFollowing: string[] = []

  if (session) {
    const data = await prisma.user.findFirst({
      where: { id: session?.user?.id },
      select: {
        followers: {
          select: {
            entityId: true
          }
        }
      }
    })

    userFollowing = data?.followers.map(({ entityId }) => entityId) ?? []
  }

  return (
    <Fragment key={session?.user?.id}>
      {
        results.length === 0 ?
          <div className="flex items-center justify-center h-[25vh]">
            No se encontraron resultados con el término "{q}"
          </div>
          :
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {
              results.map(entity => {

                const { ratingCount, ratingPotins } = getReviews(entity.events)

                const data = {
                  ...entity,
                  reviews: {
                    points: ratingPotins,
                    count: ratingCount,
                  },
                  userId: session?.user?.id,
                  isFollowing: userFollowing.includes(entity.id)
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
      }
    </Fragment>
  )
}