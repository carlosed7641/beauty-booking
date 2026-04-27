import { Suspense } from 'react'
import Loading from './loading'
import { Header } from './components/header/Header'
import { BottomMenu } from './components/bottom-menu/BottomMenu'
import { auth } from '@/auth.config'

export default async function BeautyLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    const session = await auth()

    return (
        <>
            <Header session={session} />
            <main className="min-h-screen max-w-300 my-0 mx-auto py-5 px-2">
                {children}
            </main>
            <BottomMenu />
        </>
    )
}
