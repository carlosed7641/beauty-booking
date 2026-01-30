import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { UpdateProfile } from '@/components'
import { 
    DangerButtons,
    ProfilePhoto,
    ProfileVisibility,
    ProfileWorkSamples ,
    Skills, 
    WorkExperience, 
} from '.'
import { SignOut } from './sign-out/SignOut'
import { getCountries, getUserById } from '@/actions'
import { auth } from '@/auth.config'


export default async function ProfilePage() {

    const session = await auth()

    const userData = await getUserById(session?.user?.id ?? '')
    if (!userData) throw new Error('Ocurrió un error al cargar la información del usuario')

    const countries = await getCountries()

    return (
        <>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Link href="/admin" title="Volver">
                        <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                    </Link>
                    <h1 className="text-lg text-green-700 font-bold">Mi perfil</h1>
                </div>
                <SignOut />
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <div className="flex items-center gap-3 relative">
                        <ProfilePhoto name={userData.name ?? ''} photo={userData.photo} />
                        <div className="flex flex-col gap-2">
                            <p className="text-2xl text-green-700">{userData.name}</p>
                            <UpdateProfile userData={userData} countries={countries} />
                            <ProfileVisibility isPublic={userData.isPublicProfile} />
                        </div>
                    </div>
                </div>
                <WorkExperience workExperiences={userData.workExperiences} />
                <ProfileWorkSamples 
                    samples={userData.samples} 
                    entityId={userData.entityId ?? ''}
                    authorId={userData.id} 
                />
                <Skills skills={userData.skills} />
                <DangerButtons />
            </div>

        </>
    )
}