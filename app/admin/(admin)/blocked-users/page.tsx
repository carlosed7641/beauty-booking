import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BlockedUsers } from './BlockedUsers'
import { auth } from '@/auth.config'
import { getBlockedUsers, getEntityById, getUserById } from '@/actions'

export default async function BlockedUsersPage() {

  const session = await auth()
  const user = await getUserById(session?.user?.id ?? '')
  const users = await getBlockedUsers(user?.entityId ?? '')
  
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
            users && users?.length > 0 ? <BlockedUsers users={users} entityId={user?.entityId ?? ''} />
              : <p>Aún no has bloqueado a ningún usuario. Puedes bloquear usuarios para que no agenden en este negocio</p>
          }
        </div>
      </div>
    </>
  )
}