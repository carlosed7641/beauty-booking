import { GrFavorite } from 'react-icons/gr'
import { WorkSamplesTab } from '../components'

export default function FavoriteWorkSamplesPage() {

  const favoritesWorkSamples = [
    {
      category: 'Cortes',
      name: 'Fade',
      image: 'https://picsum.photos/160/170',
      author: 'Carlos Castro',
      authorId: 'bcf',
      entityId: '422'
    },
    {
      category: 'Cortes',
      name: 'Fade',
      image: 'https://picsum.photos/160/170',
      author: 'Gregorio Carrena',
      authorId: 'abc',
      entityId: '422'
    }
  ]
  return (
    <>
      <h1 className="text-2xl text-green-700 my-4 flex gap-2 items-center">
        <GrFavorite />
        Mis favoritos
      </h1>
      <WorkSamplesTab workSamples={favoritesWorkSamples} />
    </>
  )
}