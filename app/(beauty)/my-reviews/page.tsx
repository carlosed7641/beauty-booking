import { FaRegStar } from 'react-icons/fa'
import { ReviewItem } from '../components'
import { reviews as apiReviews } from '@/util/fake-data'
import { auth } from '@/auth.config'

const userId = '27'

export default async function MyReviewsPage() {

  const session = await auth()
  const reviews = apiReviews.filter(r => r.user.id === userId)

  if (!session) {
    return (
      <p className="text-center my-4">Aún no hay reseñas</p>
    )
  }

  return (
    <>
      <h1 className="text-2xl text-green-700 my-4 flex gap-2 items-center">
        <FaRegStar />
        Mis reseñas
      </h1>
      {
          <ul className="flex flex-col gap-3 md:gap-6">
            {/* {reviews.map(review =>
              <ReviewItem
                key={review.id}
                date={review.date}
                name={review.professional.name}
                photoUrl={review.professional.photo}
                serviceName={review.service.name}
                points={review.points}
              />)
            } */}
          </ul>
      }
    </>
  )
}