import { FaRegStar } from 'react-icons/fa'
import { ReviewItem } from '../components/review-item/ReviewItem'
import { reviews as apiReviews } from '@/util/fake-data'

const userId = '27'

export default function MyReviewsPage() {

  const reviews = apiReviews.filter(r => r.user.id === userId)

  return (
    <>
      <h1 className="text-2xl text-green-700 my-4 flex gap-2 items-center">
        <FaRegStar />
        Mis reseñas
      </h1>
      {
        !reviews.length ? <h2>No hay reviews</h2> :
          <ul className="flex flex-col gap-3 md:gap-6">
            {reviews.map(review =>
              <ReviewItem
                key={review.id}
                date={review.date}
                name={review.professional.name}
                photoUrl={review.professional.photo}
                serviceName={review.service.name}
                points={review.points}
              />)
            }
          </ul>
      }
    </>
  )
}