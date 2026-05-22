import type { Metadata } from 'next'
import { ModalProvider } from '@/components'
import { inter, mainFont } from './config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beauty Booking',
  description: 'Encuentra barberías, salones de belleza y spas a tu alrededor.'
}

// TODO: Replace and delete cloudinary images
// TODO: Map & geolocalization

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${mainFont.className} antialiased`}>
          <ModalProvider>
            {children}
          </ModalProvider>
      </body>
    </html>
  )
}
