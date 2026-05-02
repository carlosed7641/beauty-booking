import { auth } from '@/auth.config'
import { Emotion } from '@/components'
import { formatedDate } from '@/helpers'
import { RiEmotionHappyLine } from 'react-icons/ri'

const professionalReviews = [
  {
    userId: 1,
    professional: {
      id: 'abc',
      name: 'Gregorio Carrena',
      photo: 'https://picsum.photos/150/150',
      entityId: '422',
      resume: 'Barbero con más de 10 años de experiencia',
      reviews: {
        points: 4.7,
        count: 224
      }
    },
    comment: 'Llegó a tiempo',
    date: 1746382434738,
    points: 3
  },
  {
    userId: 1,
    professional: {
      id: 'abc',
      name: 'Carlos Castro',
      photo: 'https://picsum.photos/150/150',
      entityId: '422',
      resume: 'Barbero con más de 10 años de experiencia',
      reviews: {
        points: 4.7,
        count: 224
      }
    },
    comment: 'Llegó tarde',
    date: 1746382434739,
    points: 2
  },
  {
    userId: 2,
    professional: {
      id: 'abc',
      name: 'Cristiano Ronaldo',
      photo: 'https://picsum.photos/150/150',
      entityId: '422',
      resume: 'Barbero con más de 10 años de experiencia',
      reviews: {
        points: 4.7,
        count: 224
      }
    },
    comment: 'No llegó',
    date: 1746382434738,
    points: 1
  }
]

const userId = 1

export default async function MyReputationPage() {

  const session = await auth()

  const reputationList = professionalReviews.filter(pr => userId === pr.userId)
  const totalPoints = reputationList.reduce((sum, pr) => sum + pr.points, 0)
  const averagePoints = reputationList.length > 0
    ? totalPoints / reputationList.length
    : 0
  const reputationLevel = averagePoints >= 2.5 ? 'Buena' : averagePoints >= 1.5 ? 'Regular' : 'Mala'

  if (!session) {
    return (
      <div className="flex flex-col items-center my-4 gap-3">
        <RiEmotionHappyLine className="text-5xl" />
        <p className="text-xl text-center">Ningún profesional te ha dejado calificaciones aún</p>
      </div>
    )
  }

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
        {reputationList.map(rp => (
          <li className="flex gap-5 items-center justify-between px-2 md:px-0" key={rp.userId + rp.date}>
            <div className="flex flex-col">
              <p className="text-green-700">{rp.professional.name}</p>
              <p className="text-zinc-500">{rp.comment}</p>
              <p className="text-zinc-500">Creado el {formatedDate(rp.date)}</p>
            </div>
            <Emotion averagePoints={rp.points} />
          </li>
        ))}
      </ul>
    </>
  )
}