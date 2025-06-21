'use client'

import { useEffect } from 'react'
import clsx from 'clsx'
import { useMenu } from '@/store'
import { MenuContent } from './MenuContent'

export const SideMenu = () => {
    
    const { isOpenMenu } = useMenu()

    useEffect(() => { document.body.classList.toggle('overflow-hidden', isOpenMenu) }, [isOpenMenu])

    return (
        <aside  className={clsx(
                "transition-transform duration-200 ease-in-out",
                "fixed top-0 left-0 z-20 h-full w-full bg-white shadow-lg md:hidden flex",
                isOpenMenu ? "translate-x-0" : "translate-x-full"
            )}>
            <MenuContent />
        </aside>
    )
}
