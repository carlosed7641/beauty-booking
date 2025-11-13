import Link from 'next/link'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { UserMenu, SideMenu, SearchBar } from '..'

export const Header = () => {
    return (
        <>
            <header className="bg-[#E2F5E5] py-4 sticky top-0 z-10">
                <div className="max-w-[1200px] my-0 mx-auto px-2 flex justify-between items-center gap-3">
                    <Link href="/" className="hidden md:block"><span className="font-bold">Beauty /</span> Booking</Link>
                    <SearchBar />
                    <div className="flex gap-3 text-sm items-center">
                        <UserMenu />
                        <Link href="/my-reservations" className="text-zinc-500 hidden md:block cursor-pointer">Mis reservas</Link>
                        <IoMdNotificationsOutline className="cursor-pointer h-[25px] w-[25px] md:h-5 md:w-5" />
                    </div>
                </div>
            </header>
            <SideMenu />
        </>
    )
}
