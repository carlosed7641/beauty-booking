'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ImproveExperience = () => {

    const pathname = usePathname()

    return (
        <div className="flex flex-col items-center gap-8 my-5">
            <h2 className="text-green-700 font-bold text-2xl">Mejora tu experiencia</h2>
            <p className="text-center">
                Para poder disfrutar de todas las funcionalidades, como <b>agendar citas con profesionales o seguir negocios,</b> debes iniciar sesión.
            </p>
            <div className="flex flex-col items-center w-full gap-4">
                <Link href={`/auth/login?redirectTo=${pathname}`} className="btn-primary rounded-full w-full max-w-110 py-2! text-center">Iniciar sesión</Link>
                <Link href={`/auth/new-account?redirectTo=${pathname}`} className="btn-secondary rounded-full w-full max-w-110 py-2! text-center">Crear cuenta</Link>
            </div>
        </div>
    )
}
