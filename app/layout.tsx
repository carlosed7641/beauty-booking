import type { Metadata } from 'next'
import { ModalProvider } from '@/components'
import { inter, mainFont } from './config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beauty Booking',
  description: 'The best beauty salons, spas and barbershops'
}

// Back button in modasl
// Tabs refactor (service-list, BookingModal (step, setStep), professionals, etc.)
// Modal Provider refactor, esc
// Refactor schedule hours frequency & exclude and schedule hours
// Merge ScheduleMonths & ScheduleYears
// schedule (professional view) & events by month not all, reports (custom date filter)
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
