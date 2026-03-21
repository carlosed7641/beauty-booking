import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Followers } from './Followers'
import { auth } from '@/auth.config'
import { getFollowers, getUserById } from '@/actions'

export default async function FollowersPage() {

  const session = await auth()
  const user = await getUserById(session?.user?.id ?? '')
  const followers = await getFollowers(user?.entityId ?? '') ?? []
  
  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <Link href="/admin" title="Volver">
          <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
        </Link>
        <h1 className="text-lg text-green-700 font-bold">Lista de seguidores {followers.length > 0 && `(${followers.length})`}</h1>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white w-full rounded-md p-7">
          {
            followers.length > 0 ? <Followers users={followers} entityId={user?.entityId ?? ''} />
              : <p>Aún no tienes seguidores</p>
          }
        </div>
      </div>
    </>
  )
}