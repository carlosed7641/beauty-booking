'use client'

import { useState } from 'react'
import { TfiAgenda } from 'react-icons/tfi'
import { ReservationList } from '../components'
import { reservations } from '@/util/fake-data'
import { SimpleTabs } from '@/components'

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

export default function MyReservationsPage() {

  const [currentTab, setCurrentTab] = useState('current')

  const currentReservations = reservations.filter(r => r.status === 'pending')
  const oldReservations = reservations.filter(r => r.status !== 'pending')

  return (
    <>
      <h1 className="text-2xl text-green-700 my-4 flex gap-2 items-center">
        <TfiAgenda />
        Mis reservas
      </h1>
      <SimpleTabs
        tabs={tabs}
        activeTab={currentTab}
        setActiveTab={setCurrentTab}
      />
      <>
        {
          currentTab === 'current' ?
            <ReservationList reservations={currentReservations} />
            :
            <ReservationList reservations={oldReservations} />
        }
      </>
    </>
  )
}