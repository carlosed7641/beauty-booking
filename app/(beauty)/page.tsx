import prisma from '@/lib/prisma'
import { auth } from '@/auth.config'
import { getUserCollection } from '@/actions'
import { Categories, FavoriteEntites, NextReservations, PopularShops, RecentServices } from './components'
import { WORKDAY_FIELDS } from '@/util/const'
import { minutesToTime, toMinutes } from '@/helpers'

interface EntityData {
  services: {
    id: string
    name: string
    gender: Gender | null
    description: string | null
    entityId: string
    category: string
    basePrice: number
    baseDurationHours: number
    baseDurationMinutes: number
    archived: boolean
  }[]
  workdays: {
    id: string
    name: string
    professionalId: string | null
    from: string
    to: string
    order: number
    disabled: boolean
  }[]
}

export default async function HomePage() {

  const session = await auth()
  let userData = null
  let professionals: ProfessionalSchedule[] = []

  if (session?.user?.id) {
    userData = await getUserCollection({ id: session.user.id, status: ['pending', 'completed'] })

    if (userData.nextReservations.length > 0) {

      const professionalIds = [
        ...new Set(
          userData.nextReservations.map((ev) => ev.selectedProfessional.id)
        )
      ]

      const professionalsData = await prisma.user.findMany({
        where: {
          id: {
            in: professionalIds
          }
        },
        include: {
          workDays: {
            select: WORKDAY_FIELDS,
            orderBy: { order: 'asc' }
          },
          serviceOverrides: {
            include: {
              service: true
            },
            orderBy: {
              service: {
                name: 'asc'
              }
            }
          }
        }
      })

      if (!professionalsData) return

      const entitiesIds = [
        ...new Set(
          userData.nextReservations.map((ev) => ev.entity!.id!)
        )
      ]

      const entityData = await prisma.entity.findMany({
        where: {
          id: {
            in: entitiesIds
          }
        },
        select: {
          id: true,
          workdays: {
            select: WORKDAY_FIELDS,
            orderBy: { order: 'asc' }
          },
          services: {
            orderBy: { name: 'asc' }
          }
        }
      })

      const entityMap = entityData.reduce((acc, entity) => {
        acc[entity.id] = {
          ...entity
        }

        return acc
      }, {} as Record<string, EntityData>)

      professionals = professionalsData.map(({ id, name, entityId, photo, workDays, serviceOverrides }) =>
      ({
        id,
        name: name ?? '',
        entityId: entityId ?? '',
        photo,
        services:
          serviceOverrides.length > 0
            ? serviceOverrides
              .filter(s => s.enabled)
              .map(s => ({
                id: s.serviceId,
                duration: {
                  hours: s.durationHours,
                  minutes: s.durationMinutes
                },
                price: s.price
              }))
            : entityMap[entityId!]?.services
              .filter(s => !s.archived)
              .map(s => ({
                id: s.id,
                duration: {
                  hours: s.baseDurationHours,
                  minutes: s.baseDurationMinutes
                },
                price: s.basePrice
              })) ?? [],
        workdays:
          workDays.length > 0
            ?
            workDays
              .map((w, idx) => ({
                ...w,
                from: minutesToTime(
                  Math.max(
                    toMinutes(w.from),
                    toMinutes(entityMap[entityId!]!.workdays[idx].from)
                  )
                ),
                to: minutesToTime(
                  Math.min(
                    toMinutes(w.to),
                    toMinutes(entityMap[entityId!]!.workdays[idx].to)
                  )
                )
              }))
              .filter((w, idx) => !entityMap[entityId!]?.workdays[idx].disabled && !w.disabled)
            :
            entityMap[entityId!]?.workdays.filter(w => !w.disabled) ?? [],
      })) ?? []
    }
  }

  return (
    <>
      {session && (
        <>
          {(userData?.nextReservations ?? []).length > 0 && (
            <NextReservations
              events={userData?.nextReservations}
              professionals={professionals}
              userId={session.user?.id ?? ''}
            />
          )}
          {(userData?.services ?? []).length > 0 && (
            <RecentServices 
              services={userData?.services ?? []} 
            />
          )}
          {(userData?.favorites ?? []).length > 0 && (
            <FavoriteEntites 
              favorites={userData?.favorites ?? []} 
            />
          )}
        </>
      )}
      <PopularShops />
      <Categories />
    </>
  )
}