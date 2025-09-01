import { useEffect, useState } from 'react'
import { useModal } from '@/store'
import { useSteps } from '../../store'
import { SelectHour } from '..'

export const StepThree = () => {

  const { data, setData } = useSteps()
  const { openModal, setOpenModal } = useModal()
  const [error, setError] = useState('')
  const [selectedService, setSelectedService] = useState({ key: '', name: '', hours: 0, minutes: 0 })

  const handleOpenDuration = (name: string, service: ServiceData) => {
    setSelectedService({
      hours: service.duration.hours,
      minutes: service.duration.minutes,
      key: name,
      name: service.name
    })
    setOpenModal(StepThree.name)
  }

  const handleChangeDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSelectedService(prev => ({
      ...prev,
      [name]: Number(value)
    }))
  }

  const setNewDuration = () => {
    if ((selectedService.hours + selectedService.minutes) === 0) return setError('La duración no puede ser cero')

    const newValue = data.selectedServices![selectedService.key].map(service => {
      if (service.name !== selectedService.name) return service
      return {
        ...service,
        duration: {
          hours: selectedService.hours,
          minutes: selectedService.minutes
        }
      }
    })

    setData({
      ...data,
      selectedServices: {
        ...data.selectedServices,
        [selectedService.key]: newValue
      }
    })

    setOpenModal(null)
    setError('')
  }

  useEffect(() => {
    setError('')
  }, [openModal])

  return (
    data.selectedServices ?
      <>
        <div className="grid md:grid-cols-3 gap-3 md:gap-10">
          {
            Object.entries(data.selectedServices).map(([name, services]) => (
              <div key={name} className="flex flex-col gap-2">
                <p className="font-bold text-green-700">{name}</p>
                <ul className="pl-2 flex flex-col gap-2">
                  {
                    services.map(service => (
                      <li key={service.name} className="flex justify-between">
                        <span>{service.name}</span>
                        <button onClick={() => handleOpenDuration(name, service)} className="text-green-700 underline font-bold cursor-pointer">
                          {service.duration.hours > 0 ? `${service.duration.hours} ${service.duration.hours === 1 ? 'hr' : 'hrs'} ${service.duration.minutes > 0 ? 'y ' + service.duration.minutes + ' min' : ''}` : `${service.duration.minutes} min`}
                        </button>
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
        {
          openModal === StepThree.name &&
          <SelectHour
            serviceName={selectedService.name}
            hours={selectedService.hours}
            minutes={selectedService.minutes}
            error={error}
            handleChange={handleChangeDuration}
            handleSave={setNewDuration}
          />
        }
      </>
      :
      <h1 className="text-red-500 font-bold">Ocurrió un error por favor complete los pasos anteriores</h1>
  )
}