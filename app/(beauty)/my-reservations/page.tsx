
import { TfiAgenda } from 'react-icons/tfi'
import { ImproveExperience, ReservationList } from '../components'
import { reservations } from '@/util/fake-data'
import { SimpleTabs } from '@/components'
import { auth } from '@/auth.config'

const tabs = [
  {
    id: 'current',
    label: 'Actuales'
  },
  {
    id: 'history',
    label: 'Historial'
  }
]

export default async function MyReservationsPage() {

  const session = await auth()

  // const [currentTab, setCurrentTab] = useState('current')

  const currentReservations = reservations.filter(r => r.status === 'pending')
  const oldReservations = reservations.filter(r => r.status !== 'pending')

  if (!session) return <ImproveExperience />

  return (
    <>
      <h1 className="text-2xl text-green-700 my-4 flex gap-2 items-center">
        <TfiAgenda />
        Mis reservas
      </h1>
      {/* <SimpleTabs
        tabs={tabs}
        activeTab={currentTab}
        setActiveTab={setCurrentTab}
      /> */}
      <>
        {
          // currentTab === 'current' ?
            <ReservationList reservations={currentReservations} />
            // :
            // <ReservationList reservations={oldReservations} />
        }
      </>
    </>
  )
}