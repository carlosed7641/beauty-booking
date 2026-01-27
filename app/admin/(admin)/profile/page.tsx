import Link from 'next/link'
import { IoIosCamera, IoMdArrowRoundBack } from 'react-icons/io'
import { UpdateProfile } from '@/components'
import { WorkExperience, Skills, WorkSamples } from '.'
import { ProfileVisibility } from './profile-visibility/ProfileVisibility'
import { SignOut } from './sign-out/SignOut'
import { getCountries, getUserById } from '@/actions'
import { auth } from '@/auth.config'
import Image from 'next/image'
import { ProfilePhoto } from './profile-photo/ProfilePhoto'


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
                <WorkSamples />
                <Skills skills={userData.skills} />
                <div className="flex flex-col md:flex-row justify-center md:justify-end gap-3">
                    <button className="md:w-60 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-full cursor-pointer">
                        Desvincularse del negocio
                    </button>
                    <button className="md:w-60 py-2  bg-red-500 hover:bg-red-600 text-white font-bold rounded-full cursor-pointer">
                        Eliminar cuenta
                    </button>
                </div>
            </div>

        </>
    )
}