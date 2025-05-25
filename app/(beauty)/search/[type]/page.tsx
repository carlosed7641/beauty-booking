import { notFound } from 'next/navigation'
import { entities } from '@/util/fake-data'
import { ServiceResult, ViewSwitcher } from '../../components'

interface Props {
  params: Promise<{ type: string }>
  searchParams: Promise<{ q: string }>
}

const types = ['entity', 'category']

export default async function SearchPage({ params, searchParams }: Props) {

  const { type } = await params
  const { q } = await searchParams
  const searchType = type.toLocaleLowerCase()

  if (!types.includes(searchType)) notFound()

  if (searchType === 'entity') {
    if (!q) notFound()
    
    const normalizedQuery = q.toLowerCase()
    const result = entities.filter(entity =>
      entity.name.toLowerCase().includes(normalizedQuery)
    )

    return <ViewSwitcher result={result} query={q} />
  }

  if (searchType === 'category') {
    return <ServiceResult />
  }
}