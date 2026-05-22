import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { ServiceResult } from '../../components'
import { getReviews } from '@/helpers'

export const metadata: Metadata = {
  title: 'Buscar por categoría'
}

export default async function SearchPage() {

  const data = await prisma.service.findMany({
    take: 100,
    where: {
      archived: false
    },
    orderBy: {
      events: {
        _count: 'desc'
      }
    },
    select: {
      id: true,
      category: true,
      name: true,
      basePrice: true,
      baseDurationHours: true,
      baseDurationMinutes: true,
      entity: {
        select: {
          id: true,
          numberId: true,
          name: true,
          events: {
            where: {
              status: { in: ['completed', 'pending'] },
              customerRating: { not: null }
            },
            select: {
              customerRating: true
            }
          }
        }
      }
    }
  })

  const results = data.map(({
    name,
    category,
    basePrice: price,
    baseDurationHours: hours,
    baseDurationMinutes: minutes,
    entity,
    id
  }) => {

    const { ratingCount, ratingPotins } = getReviews(entity.events)

    return {
      id,
      category,
      name,
      price,
      duration: {
        hours,
        minutes
      },
      entity: {
        id: entity.id,
        numberId: entity.numberId,
        name: entity.name ?? '',
        reviews: {
          points: ratingPotins,
          counts: ratingCount
        }
      }
    }

  })

  return (
    <ServiceResult results={results} />
  )
}