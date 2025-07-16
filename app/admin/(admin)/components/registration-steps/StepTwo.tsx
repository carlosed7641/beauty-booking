import { useEffect } from 'react'
import { useSteps } from '../../store'
import { SERVICES_LIST } from '@/util/const'

export const StepTwo = () => {

  const { data, setData, showErrors } = useSteps()

  const handleClickService = (key: string, value: string) => {

    const existingServices = data.stepTwo.selectedServices?.[key] ?? []

    const updatedServices = existingServices.includes(value)
      ? existingServices.filter(s => s !== value)
      : [...existingServices, value]

    const selectedServices = { ...data.stepTwo.selectedServices } 
    //TODO: Set null when object is empty

    if (updatedServices.length > 0) {
      selectedServices[key] = updatedServices
    } else {
      delete selectedServices[key]
    }
    setData({
      ...data,
      stepTwo: {
        selectedServices
      }
    })
  }

  useEffect(() => {
    console.log(data.stepTwo.selectedServices)
  }, [data.stepTwo.selectedServices])

  return (
    <div className="grid md:grid-cols-4 md:gap-6">
      {
        Object.entries(SERVICES_LIST).map(([name, services]) => (
          <div key={name} className="flex flex-col gap-4">
            <p>{name}</p>
            <div className="flex flex-wrap gap-2">
              {services.map(service => (
                <div key={name + service} onClick={() => handleClickService(name, service)} className="py-1 px-2 rounded-full border border-green-700 text-sm transition-all hover:bg-green-700 hover:text-white cursor-pointer">{service}</div>
              ))}
            </div>
          </div>
        ))
      }
    </div>
  )
}