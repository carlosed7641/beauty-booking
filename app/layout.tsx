import type { Metadata } from 'next'
import { inter, mainFont } from './config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beauty Booking',
  description: 'The best beauty salons, spas and barbershops'
}

// Modal Reviews, Entity Page - Barber Page
// Next reservatioms - update - delete
// Main menu, dk - mb
// Refactor code
// -------------------
// Admin view
// Map

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
