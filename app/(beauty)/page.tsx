import { Categories, FavoriteEntites, NearMe, NextReservations, RecentServices } from './components'

export default function HomePage() {
  return (
    <>
      <NextReservations />
      <RecentServices />
      <FavoriteEntites />
      <Categories />
      <NearMe />
    </>
  )
}