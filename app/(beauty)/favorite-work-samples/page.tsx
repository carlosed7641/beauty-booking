import { GrFavorite } from 'react-icons/gr'
import { WorkSamples } from '@/components'

export default function FavoriteWorkSamplesPage() {

  const favoritesWorkSamples: WorkSample[] = [
    {
      id: '123',
      category: 'Cortes',
      name: 'Fade',
      images: [
        {
          id: '123',
          mainImage: true,
          url: 'https://picsum.photos/160/170'
        },
        {
          id: '125',
          mainImage: true,
          url: 'https://picsum.photos/160/170'
        }
      ],
      author: 'Carlos Castro',
      authorId: 'bcf',
      entityId: '422'
    },
    {
      id: '124',
      category: 'Cortes',
      name: 'Fade',
       images: [{
          id: '123',
          mainImage: true,
          url: 'https://picsum.photos/160/170'
      }],
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
      <WorkSamples workSamples={favoritesWorkSamples} />
    </>
  )
}