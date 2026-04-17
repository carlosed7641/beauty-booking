import { redirect } from 'next/navigation'
import { LinkingCodeScreen, RegistrationData, RegistrationSteps, SelectCountry } from './components'
import { getCountries } from '@/actions'
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
    const countries = await getCountries() 
    return (
        <LinkingCodeScreen 
          countries={countries} 
          needRegistration={!user?.name || !user?.countryId || !user?.phone}
        />
      )
  }
  
  if (!user?.name || !user?.countryId || !user?.phone) {
    const countries = await getCountries() 
    return <RegistrationData countries={countries} isEmployee={user.role === 'employee'} />
  } 

  if (!user.entityId && user.role === 'admin') {
     const countries = await getCountries() 
    return <SelectCountry countries={countries} />  
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