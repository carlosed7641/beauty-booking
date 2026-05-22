import { redirect } from 'next/navigation'
import { LinkingCodeScreen, RegistrationData, RegistrationSteps } from './components'
import { SelectCountry } from '@/components'
import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

const ROLES = ['admin', 'employee']

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {

  const session = await auth()
  
  if (!session?.user || !ROLES.includes(session?.user?.role as string)) return redirect('/admin/auth/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      countryId: true,
      phone: true,
      entityId: true,
      isRegisterCompleted: true,
      role: true
    },
  })

  if (!user) throw new Error('Ocurrió un error con el usuario')

  if (!user.entityId && user.role === 'employee') {
    return (
        <LinkingCodeScreen 
          needRegistration={!user?.name || !user?.countryId || !user?.phone}
        />
      )
  }
  
  if (!user?.name || !user?.countryId || !user?.phone) {
    return <RegistrationData isEmployee={user.role === 'employee'} />
  } 

  if (!user.entityId && user.role === 'admin') {
    return <SelectCountry />  
  }
  
  if (!user.isRegisterCompleted && user.entityId && user.role === 'admin') {
    return <RegistrationSteps entityId={user.entityId} />
  }

  return (
    <div className="bg-zinc-100">
      <div className="min-h-screen max-w-300 my-0 mx-auto py-5 px-2">
          {children}
      </div>
    </div>
  )
}