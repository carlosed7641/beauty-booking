import type { Metadata } from 'next'
import { ModalProvider } from '@/components'
import { inter, mainFont } from './config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beauty Booking',
  description: 'The best beauty salons, spas and barbershops'
}

// Campos condicionales en server components
// Metadata
// Imágenes Cloduinary 
// Map

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
