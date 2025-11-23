import { useState } from 'react'
import { useModal } from '@/store'
import { useSteps } from '../../store'
import { SelectPrice } from '..'
import { formatNumber, getRawNumber } from '@/helpers'

export const StepFour = () => {

  const { data, setData } = useSteps()
  const { openModal, setOpenModal } = useModal()
  const [error, setError] = useState('')
  const [selectedService, setSelectedService] = useState({ key: '', name: '', price: 0 })

  const handleOpenPrice = (name: string, service: ServiceData) => {
    setSelectedService({
      price: service.price,
      key: name,
      name: service.name
    })
    setOpenModal(StepFour.name)
  }

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {

    const formattedPrice = Number(getRawNumber(e.target.value))
    setSelectedService(prev => {
      return {
        ...prev,
        price: formattedPrice
      }
    })
  }

  const setNewPrice = () => {
    if (!selectedService.price) {
      setError('Debe ingresar un precio')
      return
    }

    const newValue = data.selectedServices![selectedService.key].map(service => {
      if (service.name !== selectedService.name) return service
      return {
        ...service,
        price: selectedService.price
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

  return (
    data.selectedServices ?
      <>
        <div className="grid md:grid-cols-3 gap-3  md:gap-10">
          {
            Object.entries(data.selectedServices).map(([name, services]) => (
              <div key={name} className="flex flex-col gap-2">
                <p className="font-bold text-green-700">{name}</p>
                <ul className="pl-2 flex flex-col gap-2">
                  {
                    services.map(service => (
                      <li key={service.name} className="flex justify-between">
                        <span>{service.name}</span>
                        <button onClick={() => handleOpenPrice(name, service)} className="text-green-700 underline font-bold cursor-pointer">
                          ${formatNumber(service.price)}
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
          openModal === StepFour.name &&
          <SelectPrice
            serviceName={selectedService.name}
            price={selectedService.price}
            error={error}
            handleChange={onChangePrice}
            handleSave={setNewPrice}
          />
        }
      </>
      :
      <h1 className="text-red-500 font-bold">Ocurrió un error por favor complete los pasos anteriores</h1>
  )
}