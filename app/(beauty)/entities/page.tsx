import { entities } from '@/util/fake-data'
import { EntityCard } from '../components'

export default function EntitiesPage() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {
        entities.map(entity => (
          <EntityCard entity={entity} key={entity.id} />
        ))
      }
    </div>
  )
}