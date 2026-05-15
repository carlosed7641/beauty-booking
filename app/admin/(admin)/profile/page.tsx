import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { ProfilePhoto, UpdateProfile } from '@/components'
import {
    DangerButtons,
    ProfileVisibility,
    ProfileWorkSamples,
    Skills,
    WorkExperience,
} from '.'
import { SignOut } from './sign-out/SignOut'
import { getEntityById, getUserById } from '@/actions'
import { auth } from '@/auth.config'
import { UserDTO } from '@/interfaces/user.interface'

export default async function ProfilePage() {

    const session = await auth()

    const userData = await getUserById(session?.user?.id ?? '')
    const entity = await getEntityById(userData?.entityId ?? '')
    if (!userData) throw new Error('Ocurrió un error al cargar la información del usuario')

    const isOwner = entity?.ownerId === userData.id 

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
                            <UpdateProfile userData={userData as UserDTO} />
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
                <DangerButtons isOwner={isOwner} userId={userData.id} />
            </div>

        </>
    )
}