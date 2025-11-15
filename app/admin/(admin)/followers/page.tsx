import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Followers } from './Followers'

export default function FollowersPage() {

  //TODO: Get from DB
  const followers: UserInfo[] = [
    {
      id: '123',
      name: 'Camilo Suárez'
    },
    {
      id: '124',
      name: 'Juan Castellanos'
    },
    {
      id: '125',
      name: 'Alan Britos'
    }
  ]

  const filteredFollowers = followers.filter(f => !f.blocked)

  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <Link href="/admin" title="Volver">
          <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
        </Link>
        <h1 className="text-lg text-green-700 font-bold">Lista de seguidores {filteredFollowers.length > 0 && `(${filteredFollowers.length})`}</h1>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white w-full rounded-md p-7">
          {
            filteredFollowers.length > 0 ? <Followers users={filteredFollowers} />
              : <p>Aún no tienes seguidores</p>
          }
        </div>
      </div>
    </>
  )
}