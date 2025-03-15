'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { useMenu } from '@/store'

export const HamburgerMenu = () => {
    const { setMenuState } = useMenu()
    const handleOpenMenu = () => setMenuState({ position: 0, isOpenMenu: true })
    return <AiOutlineMenu size={25} className="md:hidden" onClick={handleOpenMenu} />
}
