'use client'

import { GoSignOut } from 'react-icons/go'
import { logout } from '@/actions'

export const SignOut = () => {

    const onLogout = async () => {
        await logout()
    }
    
    return (
        <button onClick={onLogout} className="flex items-center gap-2 text-green-700 cursor-pointer">
            <GoSignOut />
            Cerrar sesión
        </button>
    )
}
