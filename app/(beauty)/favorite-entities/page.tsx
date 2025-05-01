import { EntityCard } from '../components'

export default function FavoriteEntitiesPage() {

  const favoriteEntities: Entity[] = [
    {
      id: '422',
      imageSrc: 'https://picsum.photos/200/200',
      name: 'Acicalate Vip',
      address: {
        street: 'Cra 30 #24-32',
        city: 'Soledad',
        state: 'Atlántico',
        country: 'Colombia',
        reference: 'Arriba del TA DA'
      },
      reviews: {
        points: 4.5,
        counts: 233
      },
      followers: 38,
      scheduling: 104,
      contactUrl: 'https://www.whatsapp.com/channel/0029Va4PN8hFCCoO00odQi0v'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {
        favoriteEntities.map(entity => (
          <EntityCard entity={entity} key={entity.id} />
        ))
      }
    </div>
  )
}