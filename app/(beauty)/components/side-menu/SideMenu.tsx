'use client'

import { useEffect } from 'react'
import clsx from 'clsx'
import { useMenu } from '@/store'
import { MenuContent } from '.'

export const SideMenu = ({ userName }: { userName: string}) => {

    const isOpenMenu = useMenu(state => state.isOpenMenu)

    useEffect(() => { document.body.classList.toggle('overflow-hidden', isOpenMenu) }, [isOpenMenu])

    return (
        <aside className={clsx(
            "transition-transform duration-200 ease-in-out",
            "fixed top-0 left-0 z-20 h-full w-full bg-white shadow-lg md:hidden flex",
            isOpenMenu ? "translate-x-0" : "translate-x-full"
        )}>
            <MenuContent userName={userName} />
        </aside>
    )
}