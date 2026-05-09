import { Suspense } from 'react'
import Loading from './loading'
import { Header } from './components/header/Header'
import { BottomMenu } from './components/bottom-menu/BottomMenu'
import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { getCountries } from '@/actions'
import { SelectCountry } from '@/components'
import { RegistrationUserForm } from './components'

export default async function BeautyLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    const session = await auth()
    let userName = null

    if (session?.user?.role === 'admin' || session?.user?.role === 'employee') return redirect('/admin')

    if (session) {
        const user = await prisma.user.findUnique({
            where: { id: session?.user?.id },
            select: {
                name: true,
                countryId: true,
                phone: true,
                isRegisterCompleted: true,
                role: true
            },
        })

        if (!user) throw new Error('Ocurrió un error con el usuario')

        userName = user.name

        if (!user?.countryId) {
            const countries = await getCountries()
            return (
                 <SelectCountry  
                    countries={countries}
                    isUser
                 />
            )
        }

        if (!user.isRegisterCompleted) {
            const countries = await getCountries()
            return (
                 <RegistrationUserForm countries={countries} />
            )
        }

    }

    return (
        <>
            <Header session={session} userName={userName ?? ''} />
            <main className="min-h-screen max-w-300 my-0 mx-auto py-5 px-2">
                {children}
            </main>
            <BottomMenu />
        </>
    )
}
