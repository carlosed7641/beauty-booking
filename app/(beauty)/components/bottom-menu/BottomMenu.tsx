'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useMenu } from '@/store'
import { HamburgerMenu } from '../hamburger-menu/HamburgerMenu'
import { MENU_OPTIONS } from '@/util/const'

const options = MENU_OPTIONS.filter(opt => opt.onBotton?.is)

export const BottomMenu = () => {

    const pathname = usePathname()
    const [currentActive, setCurrentActive] = useState(pathname)
    const { isOpenMenu, setIsOpenMenu } = useMenu()

    const handleClick = (href: string) => {
        setCurrentActive(href)
        setIsOpenMenu(false)
    }

    useEffect(()=> {
        setCurrentActive(pathname)
    }, [pathname])


    return (
        <div  className="sticky bottom-0 z-30 grid grid-cols-4 md:hidden bg-white border-t boder-zinc-100">
            {
                options.map(({ Icon, label, href }) => (
                    <Link onClick={()=> handleClick(href)} key={label} href={href} 
                    className={
                        clsx(
                            "text-green-700 flex flex-col gap-1 items-center justify-center pt-4 pb-2",
                            {
                                "bg-green-700 text-white": (href === currentActive) && !isOpenMenu
                            }
                        )
                    }>
                        <Icon className="text-xl" />
                        {label}
                    </Link>
                ))
            }
           <HamburgerMenu />
        </div>
    )
}
