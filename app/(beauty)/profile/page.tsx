import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { auth } from '@/auth.config'
import { ProfilePhoto, SignOut, UpdateProfile } from '@/components'
import { ImproveExperience, RecentServices } from '../components'
import { formatDate, getReviews } from '@/helpers'
import { GENDERS } from '@/util/const'

const ENTITY_FIELDS = {
  id: true,
  numberId: true,
  name: true,
  logo: true,
  events: {
    where: {
      status: 'completed'
    },
    select: {
      customerRating: true
    }
  }
} as const

export const metadata: Metadata = {
  title: 'Mi perfil'
}


export default async function ProfilePage() {

  const session = await auth()
  if (!session) return <ImproveExperience />

  const user = await prisma.user.findFirst({
    where: { id: session.user?.id },
    select: {
      indicator: true,
      phone: true,
      photo: true,
      name: true,
      countryId: true,
      birthDay: true,
      gender: true,
      role: true,
      customers: {
        select: {
          events: {
            where: {
              status: { in: ['pending', 'completed'] },
              service: { archived: false }
            },
            include: {
              entity: {
                select: {
                  ...ENTITY_FIELDS,
                }
              },
              service: {
                select: {
                  name: true,
                  id: true,
                  category: true,
                  basePrice: true,
                  baseDurationHours: true,
                  baseDurationMinutes: true
                }
              }
            }
          }
        }

      }
    }
  })

  const events =
    user?.customers.flatMap(item => item.events) ?? []

  const seen = new Set()

  const recentServices =
    events
      .sort((a, b) => b?.start.getTime() - a?.start.getTime())
      .map(({ entity, service }) => {
        const { ratingCount, ratingPotins } = getReviews(entity.events)
        return {
          ctaData: {
            serviceId: service.id,
            price: service.basePrice,
            name: service.name,
            duration: {
              hours: service.baseDurationHours,
              minutes: service.baseDurationMinutes
            }
          },
          href: `/entity/${entity.numberId}`,
          imageSrc: entity.logo,
          ratingCount,
          ratingPotins,
          serviceName: service.name,
          shopName: entity.name ?? ''
        }
      })
      .filter(item => {
        const id = item.ctaData.serviceId

        if (seen.has(id)) return false

        seen.add(id)
        return true
      })
      .slice(0, 5) ?? []



  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-3 mb-12 text-center md:text-left relative">
        <ProfilePhoto
          name={user?.name ?? ''}
          photo={user!.photo}
        />
        <div className="flex flex-col gap-1.5">
          <p className="text-xl text-green-700">{user?.name}</p>
          {user?.birthDay && <p className="text-zinc-500">{user.gender && GENDERS[user.gender] + ' -'} {formatDate({ date: user.birthDay, month: 'numeric' })}</p>}
          <UpdateProfile
            userData={{
              birthDay: user?.birthDay,
              countryId: user?.countryId,
              gender: user?.gender,
              indicator: user?.indicator,
              name: user?.name,
              phone: user?.phone,
              role: user?.role,
            }}
          />
         <SignOut /> 
        </div>
      </div>
      {recentServices.length > 0 && <RecentServices services={recentServices} />}
    </>
  )
}