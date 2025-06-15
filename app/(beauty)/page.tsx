import { Categories, NearMe, NextReservations, RecentServices } from './components'

export default function HomePage() {
  return (
    <>
      <NextReservations />
      <RecentServices />
      <Categories />
      <NearMe />
    </>
  )
}