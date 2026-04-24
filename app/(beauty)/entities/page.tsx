import { searchEntity } from '@/actions'
import { EntityCard } from '../components'

interface Props {
  params: Promise<{ type: string }>
  searchParams: Promise<{ q: string }>
}

export default async function EntitiesPage({ searchParams }: Props) {

  const { q } = await searchParams

  const normalizedQuery = q?.toLowerCase() || ''

  const { results } = await searchEntity(normalizedQuery)

  return (
    <>
    {
      results.length === 0 ?
      <div className="flex items-center justify-center h-[25vh]">
        No se encontraron resultados con el término "{q}"   
      </div>
      :
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {
          results.map(entity => (
            <EntityCard entity={entity} key={entity.numberId} />
          ))
        }
      </div>
        }
    </>
  )
}