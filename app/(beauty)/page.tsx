import { auth } from '@/auth.config'
import { Categories, FavoriteEntites, NearMe, NextReservations, PopularShops, RecentServices } from './components'

export default async function HomePage() {

  const session = await auth()
  const isCustomer = session?.user?.role === 'user'

  return (
    <>
      {!isCustomer && <PopularShops />}
      {isCustomer && (
        <>
          <NextReservations />
          <RecentServices />
          <FavoriteEntites />
        </>
      )}
      <Categories />
      {isCustomer && <NearMe />}
    </>
  )
}