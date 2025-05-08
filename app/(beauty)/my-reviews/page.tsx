import { reviews as apiReviews } from '@/util/fake-data'
import { FaRegStar } from 'react-icons/fa'
import { ReviewList } from '../components'

const userId = 27

export default function MyReviewsPage() {

  const reviews = apiReviews.filter(r => r.userId === userId)

  return (
    <>
      <h1 className="text-2xl text-green-700 my-4 flex gap-2 items-center">
        <FaRegStar />
        Mis reseñas
      </h1>
      {
        !reviews.length ? <h2>No hay reviews</h2> :
          <ReviewList reviews={reviews} />
      }
    </>
  )
}