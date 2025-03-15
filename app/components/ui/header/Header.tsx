import Link from 'next/link'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoMdSearch } from 'react-icons/io'
import { UserMenu } from '../../user-menu/UserMenu'
import { SideMenu } from '../side-menu/SideMenu'
import { HamburgerMenu } from '../hamburger-menu/HamburgerMenu'

export const Header = () => {
    return (
        <>
            <header className="bg-[#E2F5E5] py-4 sticky top-0">
                <div className="max-w-[1200px] my-0 mx-auto px-2 flex justify-between items-center gap-3">
                    <Link href="/" className="hidden md:block"><span className="font-bold">Beauty |</span> Booking</Link>
                    <HamburgerMenu />
                    <div className="relative w-4/5 md:w-3/5">
                        <input type="text" placeholder="Search Beauty Shop" className="bg-white w-full rounded-sm px-3 p-1 focus-visible:outline-0 shadow-sm" />
                        <IoMdSearch size={20} className="absolute right-2.5 top-1.5 cursor-pointer" />
                    </div>
                    <div className="flex gap-3 text-sm items-center">
                        <UserMenu />
                        <Link href="/" className="text-zinc-500 hidden md:block">My reservations</Link>
                        <IoMdNotificationsOutline className="cursor-pointer h-[25px] w-[25px] md:h-5 md:w-5" />
                    </div>
                </div>
            </header>
            <SideMenu />
        </>
    )
}
