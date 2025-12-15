import { ServiceResult } from '../../components'
import { serviceList } from '@/util/fake-data'

export default function SearchPage() {

  const s = [...serviceList] //TODO: get from DB

  return <ServiceResult serviceList={s} />
}