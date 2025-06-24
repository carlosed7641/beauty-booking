'use client'

import { useState } from 'react'
import { TfiAgenda } from 'react-icons/tfi'
import clsx from 'clsx'
import { ReservationList } from '../components'
import { reservations } from '@/util/fake-data'

export default function MyReservationsPage() {

  const [currentTab, setCurrentTab] = useState<'current' | 'history'>('current')

  const currentReservations = reservations.filter(r => r.status === 'pending')
  const oldReservations = reservations.filter(r => r.status !== 'pending')

  return (
    <>
      <h1 className="text-2xl text-green-700 my-4 flex gap-2 items-center">
        <TfiAgenda />
        Mis reservas
      </h1>
      <div className="flex justify-center gap-6">
        <div onClick={() => setCurrentTab('current')} role="tab"
          className={
            clsx(
              "px-10 border-b-4 cursor-pointer border-zinc-300",
              {
                "border-green-700!": currentTab === 'current'
              }
            )
          }>
          Actuales
        </div>
        <div onClick={() => setCurrentTab('history')} role="tab"
          className={
            clsx(
              "px-10 border-b-4 cursor-pointer border-zinc-300",
              {
                "border-green-700!": currentTab === 'history'
              }
            )
          }>
          Historial
        </div>
      </div>
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