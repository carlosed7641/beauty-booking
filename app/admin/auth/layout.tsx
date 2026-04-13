import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

const ADMIN_ROLES = ['admin', 'employee']

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {

  const session = await auth()

  if (session?.user && session?.user.role && ADMIN_ROLES.includes(session.user.role)) {
      redirect('/admin')
  }

  return (
    <div className="bg-[#eaf1eb] flex justify-center pt-24 md:items-center px-4 md:pt-0 h-screen">
      <div className="bg-white p-5 rounded-md shadow-md sm:w-100 w-full h-fit">
        {children}
      </div>
    </div>
  )
}