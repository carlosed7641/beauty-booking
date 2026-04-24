import Link from 'next/link'
// import { UserMenu } from '../user-menu/UserMenu'
import { auth } from '@/auth.config'
import { SearchBar } from '../search-bar/SearchBar'
import { SideMenu } from '../side-menu/SideMenu'

export const Header = async () => {

    // const session = await auth()

    return (
        <>
            <header className="bg-[#E2F5E5] py-4 sticky top-0 z-10">
                <div className="max-w-300 my-0 mx-auto px-2 flex justify-between items-center gap-3">
                    <Link href="/" className="hidden md:block"><span className="font-bold">Beauty /</span> Booking</Link>
                    <SearchBar />
                    <div className="flex gap-3 text-sm items-center">
                        {/* { !!session && <UserMenu /> } */}
                        <Link href="/my-reservations" className="text-zinc-500 hidden md:block cursor-pointer">Mis reservas</Link>
                    </div>
                </div>
            </header>
            <SideMenu />
        </>
    )
}
