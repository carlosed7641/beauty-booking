import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BlockedUsers } from './BlockedUsers'

export default function BlockedUsersPage() {

  //TODO: Get from DB
  const users: UserInfo[] = [
    {
      id: '123',
      name: 'Camilo Suárez',
      photo: 'https://picsum.photos/150/150'
    },
    {
      id: '124',
      name: 'Juan Castellanos',
    },
    {
      id: '125',
      name: 'Alan Britos',
      photo: 'https://picsum.photos/150/150'
    }
  ]

  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <Link href="/admin/settings" title="Volver">
          <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
        </Link>
        <h1 className="text-lg text-green-700 font-bold">Usuarios Bloqueados</h1>
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-white w-full rounded-md p-7">
          {
            users.length > 0 ? <BlockedUsers users={users} />
              : <p>Aún no has bloqueado a ningún usuario. Puedes bloquear usuarios para que no agenden en este negocio</p>
          }
        </div>
      </div>
    </>
  )
}