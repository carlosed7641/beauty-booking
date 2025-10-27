import type { Metadata } from 'next'
import { ModalProvider } from '@/components'
import { inter, mainFont } from './config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beauty Booking',
  description: 'The best beauty salons, spas and barbershops'
}

// Step One change name
// Merge step three-four
// Field component in forms
// Profile sections container
// Grid autofill display grids
// Validate modal widths
// Create clase button
// Back button in sections
// Back button in modasl
// Tabs refactor (service-list, BookingModal (step, setStep), professionals, etc.)
// Modal Provider refactor, esc
// Refactor schedule hours frequency & exclude and schedule hours
// Merge ScheduleMonths & ScheduleYears
// Schule history (user) in schedule
// formatNumber string to number param

// Map
// Metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${mainFont.className} antialiased`}>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  )
}
