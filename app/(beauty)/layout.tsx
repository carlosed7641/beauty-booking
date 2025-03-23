import { Header } from "../components";

export default function BeautyLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Header />
            <main className="min-h-screen max-w-[1200px] my-0 mx-auto py-5 px-2">
                {children}
            </main>
        </>
    );
}
