import Image from 'next/image'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa6'
import { UpdateProfile } from '@/components'
import { ImproveExperience, RecentServices } from '../components'
import { session } from '@/util/fake-data'
import { auth } from '@/auth.config'

export default async function ProfilePage() {

  const sessionDB = await auth()

  const [year, month, day] = session.birthDay.split('-')
  const birthDate = `${day}/${month}/${year}`

  if (!sessionDB) return <ImproveExperience />

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-3 mb-12">
        <Image src={session.photo ?? ''} alt={session.name} width={180} height={180} />
        <div className="flex flex-col gap-3">
          <p className="text-2xl text-green-700">{session.name}</p>
          <p className="text-zinc-500">{session.gender} - {birthDate}</p>
          {/* <UpdateProfile /> */}
          <button className='flex gap-2 items-center cursor-pointer w-fit'>

            {
              session.shareNumberPhone ?
                <FaToggleOn className="text-green-700 text-xl" /> :
                <FaToggleOff className="text-green-700 text-xl" />
            }

            Compartir número
          </button>
        </div>
      </div>
      <RecentServices />
    </>
  )
}