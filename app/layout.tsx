import type { Metadata } from 'next'
import { inter, mainFont } from './config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beauty Booking',
  description: 'The best beauty salons, spas and barbershops'
}

// Loader
// Keyboard actions
// Refactor code
// -------------------
// Admin view
// Map
// Metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body  className={`${inter.className} ${mainFont.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
