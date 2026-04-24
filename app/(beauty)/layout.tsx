import { Suspense } from 'react'
import Loading from './loading'
import { Header } from './components/header/Header'
import { BottomMenu } from './components/bottom-menu/BottomMenu'

export default function BeautyLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Header />
                <main className="min-h-screen max-w-300 my-0 mx-auto py-5 px-2">
                    {children}
                </main>
                <BottomMenu />
            </Suspense>
        </>
    )
}
