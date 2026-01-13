import { Categories, FavoriteEntites, NearMe, NextReservations, RecentServices } from './components'

export default async function HomePage() {
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