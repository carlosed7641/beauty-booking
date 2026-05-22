import { Header } from './components/header/Header'
import { BottomMenu } from './components/bottom-menu/BottomMenu'
import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { SelectCountry } from '@/components'
import { RegistrationUserForm, ExpiredEventsModal } from './components'

export default async function BeautyLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    const session = await auth()
    let userName = null
    let userPhoto = undefined
    let expiredEvents: EventReview[] = []

    if (session?.user?.role === 'admin' || session?.user?.role === 'employee') return redirect('/admin')

    if (session) {
        const user = await prisma.user.findUnique({
            where: { id: session?.user?.id },
            select: {
                name: true,
                photo: true,
                countryId: true,
                phone: true,
                isRegisterCompleted: true,
                role: true
            },
        })

        if (!user) throw new Error('Ocurrió un error con el usuario')

        userName = user.name
        userPhoto = user.photo

        if (!user?.countryId) {
            return (
                <SelectCountry
                    isUser
                />
            )
        }

        if (!user.isRegisterCompleted) {
            return (
                <RegistrationUserForm />
            )
        }


        expiredEvents = await prisma.event.findMany({
            where: {
                customer: {
                    userId: session.user?.id
                },
                end: {
                    lt: new Date()
                },
                status: {
                    in: ['completed', 'pending']
                },
                customerRating: null,
                expiredViewed: false
            },
            orderBy: {
                start: 'asc'
            },
            select: {
                id: true,
                title: true,
                start: true,
                professional: {
                    select: {
                        name: true,
                        photo: true
                    }
                }
            }
        })
    }

    return (
        <>
            <Header
                session={session}
                userName={userName ?? ''}
                userPhoto={userPhoto ?? undefined}
            />
            <main className="min-h-screen max-w-300 my-0 mx-auto py-5 px-2">
                {children}
            </main>
            <BottomMenu />
            <ExpiredEventsModal events={expiredEvents} />
        </>
    )
}
