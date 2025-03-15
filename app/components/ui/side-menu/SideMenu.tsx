'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { useMenu } from '@/store'
import { MenuContent } from './MenuContent'

export const SideMenu = () => {

    const { menuState, setMenuState } = useMenu()
    const menuDragging = useRef({
        isDragging: false,
        startX: 0,
        maxScroll: 0
    })

    const handleTouchStart = (e: React.TouchEvent) => {
        menuDragging.current.isDragging = true
        menuDragging.current.startX = e.touches[0].pageX
        menuDragging.current.maxScroll = -window.innerWidth
    }

    const handleTouchMove = (e: React.TouchEvent) => {

        if (menuDragging.current.isDragging) {
            const x = e.touches[0].pageX
            let newPosition = (x - menuDragging.current.startX) * 1.5

            newPosition = Math.max(newPosition, menuDragging.current.maxScroll)
            newPosition = Math.min(newPosition, 0)

            setMenuState({
                ...menuState,
                position: newPosition
            })
        }
    }

    const handleTouchEnd = () => {

        menuDragging.current.isDragging = false

        if (menuState.position > menuDragging.current.maxScroll * 0.3) {
            setMenuState({ ...menuState, position: 0 })
        } else {
            setMenuState({ ...menuState, isOpenMenu: false })
        }
    }

    useEffect(() => { document.body.classList.toggle('overflow-hidden', menuState.isOpenMenu) }, [menuState.isOpenMenu])

    return (
        <>
            <div onClick={() => setMenuState({ ...menuState, isOpenMenu: false })} className={
                clsx(
                    "fixed z-[999] bg-zinc-800 right-0 left-0 bottom-0 top-0",
                    {
                        "opacity-50 pointer-events-auto": menuState.isOpenMenu,
                        "opacity-0 pointer-events-none": !menuState.isOpenMenu
                    }
                )
            }>
            </div>
            <aside
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ transform: menuState.isOpenMenu ? `translateX(${menuState.position}px)` : 'translateX(-100%)' }}
                className="flex md:hidden fixed top-0 left-0 z-[999] h-full w-5/6 bg-white shadow-lg transition-transform duration-300 ease-out"
            >
                <MenuContent />
            </aside>
        </>
    )
}
