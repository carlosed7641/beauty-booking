import { EntityCard } from '../components'
import { entities } from '@/util/fake-data'

interface Props {
  params: Promise<{ type: string }>
  searchParams: Promise<{ q: string }>
}

export default async function EntitiesPage({ searchParams }: Props) {

  const { q } = await searchParams

  const normalizedQuery = q?.toLowerCase() || ''
  const results = entities.filter(entity =>
    entity.name.toLowerCase().includes(normalizedQuery)
  )

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {
          results.map(entity => (
            <EntityCard entity={entity} key={entity.id} />
          ))
        }
      </div>
    </>
  )
}