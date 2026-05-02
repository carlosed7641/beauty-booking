import { auth } from '@/auth.config'
import { EntityCard } from '../components'
import { favoriteEntities } from '@/util/fake-data'

export default async function FavoriteEntitiesPage() {

  const session = await auth()

  if (!session) {
    return (
      <p className="text-center my-4">Aún no sigues a ningún negocio</p>
    )
  }

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