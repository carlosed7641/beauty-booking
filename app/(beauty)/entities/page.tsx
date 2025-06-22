import { entities } from '@/util/fake-data'
import { EntityResults } from '../components/entity/EntityResults'

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

  return <EntityResults results={results} query={q} />
}