'use client'

import { IoShareSocialOutline } from 'react-icons/io5'

export const ShareButton = ({ name, numberId }: { name: string, numberId: number }) => {

    const handleShare = async () => {

        const baseUrl = window.location.origin
        const shareUrl = `${baseUrl}/entity/${numberId}`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Compartir',
                    text: `Bievenido a ${name} es un gusto atenderte. Agenda tu cita aquí`,
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
        <button onClick={handleShare} title="Compartir">
            <IoShareSocialOutline
                className="cursor-pointer"
            />
        </button>
    )
}
