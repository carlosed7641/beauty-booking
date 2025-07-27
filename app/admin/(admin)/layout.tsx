import { RegistrationData, RegistrationSteps, SelectCountry } from './components'

const user = {
  id: 1,
  email: 'carlos@gmail.com',
  role: 'admin',
  name: 'Carlos Castro Reales',
  photo: null,
  country: 'CO',
  phone: '3004394704',
  indicatorPhone: '+57',
  shopCountry: 'CO',
  isRegisterCompleted: true
}

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {

  // TODO: validate if logged

  if (!user.name || !user.country || !user.phone) {
    return <RegistrationData />
  } 

  if (!user.shopCountry) {
    return <SelectCountry />  
  }
  
  if (!user.isRegisterCompleted) {
    return <RegistrationSteps />
  }

  //TODO: Change step one data
  return (
    <div className="bg-zinc-100">
      <div className="min-h-screen max-w-[1200px] my-0 mx-auto py-5 px-2">
          {children}
      </div>
    </div>
  )
}