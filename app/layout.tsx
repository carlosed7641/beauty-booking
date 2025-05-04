import type { Metadata } from 'next'
import { inter, mainFont } from './config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beauty Booking',
  description: 'The best beauty salons, spas and barbershops'
}

// Reviews page
// Profile page
// Favorites works samples
// Search Page, search bar, filters
// Map page
// Login Page
// -------------------
// Modal Reviews, Entity Page - Barber Page
// Next reservatioms - update - delete
// Main menu, dk - mb
// -------------------
// Admin view

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
