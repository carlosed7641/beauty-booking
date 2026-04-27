'use client'

import Link from "next/link"
import { FaWhatsapp } from "react-icons/fa"
import { GoShareAndroid } from "react-icons/go"

export const Social = ({ contactUrl, numberId, name, className = '' }: {
    contactUrl: string | null,
    numberId: number,
    name: string
    className?: string
}) => {


    const handleShare = async () => {

        const baseUrl = window.location.origin
        const shareUrl = `${baseUrl}/entity/${numberId}`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Compartir',
                    text: `Visita ${name}, atendemos todos los días`,
                    url: shareUrl
                })
            } catch (error) {
                console.error('Error al compartir:', error)
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl)
                alert('Enlace copiado al portapapeles')
            } catch (err) {
                console.error('Error al copiar:', err)
            }
        }
    }


    return (
        <div className={`${className} flex justify-around`}>
            <button onClick={handleShare} className="flex flex-col gap-1 items-center text-zinc-500 cursor-pointer">
                <GoShareAndroid className="text-green-700 text-2xl md:text-3xl" />
                Compartir
            </button>
            {contactUrl && <Link href={contactUrl} target="_blank" className="flex flex-col gap-1 items-center text-zinc-500">
                <FaWhatsapp className="text-green-700 text-2xl md:text-3xl" />
                Chatear
            </Link>}
        </div>
    )
}


