import { auth } from '@/auth.config'
import { Categories, FavoriteEntites, NearMe, NextReservations, PopularShops, RecentServices } from './components'

export default async function HomePage() {

  const session = await auth()

  return (
    <>
      <PopularShops />
      {session && (
        <>
          <NextReservations />
          <RecentServices />
          <FavoriteEntites />
        </>
      )}
      <Categories />
      {session && <NearMe />}
    </>
  )
}