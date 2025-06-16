import { EntityCard } from '../components'
import { favoriteEntities } from '@/util/fake-data'

export default function FavoriteEntitiesPage() {
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