import { redirect } from 'next/navigation'
import { RegistrationData, RegistrationSteps, SelectCountry } from './components'
import { getCountries } from '@/actions'
import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {

  const session = await auth()
  
  if (!session?.user || session.user.role !== 'admin') return redirect('/admin/auth/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      countryId: true,
      phone: true,
      entityId: true,
      isRegisterCompleted: true,
    },
  })

  if (!user) throw new Error('Ocurrió un error con el usuario')
  
  if (!user?.name || !user?.countryId || !user?.phone) {
    const countries = await getCountries() 
    return <RegistrationData countries={countries} />
  } 

  if (!user.entityId) {
     const countries = await getCountries() 
    return <SelectCountry countries={countries} />  
  }
  
  if (!user.isRegisterCompleted) {
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