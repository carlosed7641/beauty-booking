import { useState } from 'react'
import { useSteps } from '../../store'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { formatNumber, getRawNumber } from '@/helpers'

export const StepFour = () => {

  const { data, setData } = useSteps()
  const { openModal, setOpenModal } = useModal()
  const [error, setError] = useState(false)
  const [selectedService, setSelectedService] = useState({ key: '', name: '', price: '' })

  const handleOpenPrice = (name: string, service: ServiceData) => {
    setSelectedService({
      price: service.price.toString(),
      key: name,
      name: service.name
    })
    setOpenModal(StepFour.name)
  }

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {

    const formattedPrice = formatNumber(e.target.value)
    setSelectedService(prev => {
      return {
        ...prev,
        price: formattedPrice
      }
    })
  }

  const setNewPrice = () => {
    if (!selectedService.price) {
      setError(true)
      return
    }

    const formattedPrice = Number(getRawNumber(selectedService.price))
    const newValue = data.selectedServices![selectedService.key].map(service => {
      if (service.name !== selectedService.name) return service
      return {
        ...service,
        price: formattedPrice
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
    setError(false)
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
                          ${formatNumber(service.price.toString())}
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
          <Modal className="md:w-1/3! overflow-auto!">
            <ModalHeader>
              <p className="text-green-700 font-bold text-lg">{selectedService.name}</p>
            </ModalHeader>
            <label className="flex flex-col gap-1">
              <span className="text-green-700">Precio desde</span>
              <div className="flex gap-1 items-center">
                <span className="text-green-700 font-bold">$</span>
                <input onChange={onChangePrice} className="flex-1 px-2 rounded-md border border-green-700 focus:outline-0 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="text" value={formatNumber(selectedService.price.toString())} />
              </div>
            </label>
            {error && !selectedService.price && <span className="text-red-500 mt-3 block">Debe ingresar un precio</span>}
            <button onClick={setNewPrice} className="py-0.5 bg-green-700 mt-3 rounded-md text-white w-full font-bold cursor-pointer">
              Guardar
            </button>
          </Modal>
        }
      </>
      :
      <h1 className="text-red-500 font-bold">Ocurrió un error por favor complete los pasos anteriores</h1>
  )
}