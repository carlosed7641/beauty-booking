import { useState } from 'react'
import { useSteps } from '../../store'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'

export const StepThree = () => {

  const { data, setData } = useSteps()
  const { openModal, setOpenModal } = useModal()
  const [error, setError] = useState(false)
  const [selectedTime, setSelectedTime] = useState({ hours: 0, minutes: 0, service: { key: '', name: '' } })

  const handleOpenDuration = (name: string, service: ServiceData) => {
    setSelectedTime({
      hours: service.duration.hours,
      minutes: service.duration.minutes,
      service: {
        key: name,
        name: service.name
      }
    })
    setOpenModal(StepThree.name)
  }

  const onChangeDuration = (e: React.ChangeEvent<HTMLSelectElement>, type: 'hours' | 'minutes') => {
    setSelectedTime(prev => {
      if (type === 'hours') {
        return {
          ...prev,
          hours: Number(e.target.value)
        }
      }
      return {
        ...prev,
        minutes: Number(e.target.value)
      }
    })

  }

  const setNewDuration = () => {
    if ((selectedTime.hours + selectedTime.minutes) === 0) return setError(true)
    const newValue = data.selectedServices![selectedTime.service.key].map(service => {
      if (service.name !== selectedTime.service.name) return service
      return {
        ...service,
        duration: {
          hours: selectedTime.hours,
          minutes: selectedTime.minutes
        }
      }
    })

    setData({
      ...data,
      selectedServices: {
        ...data.selectedServices,
        [selectedTime.service.key]: newValue
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
                        <button onClick={() => handleOpenDuration(name, service)} className="text-green-700 underline font-bold cursor-pointer">
                          {service.duration.hours > 0 ? `${service.duration.hours} ${service.duration.hours === 1 ? 'hr' : 'hrs'} ${service.duration.minutes > 0 ? 'y '+ service.duration.minutes+' min' : ''}` : `${service.duration.minutes} min`}
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
          <Modal className="md:w-1/3!">
            <ModalHeader>
              <p className="text-green-700 font-bold text-lg">{selectedTime.service.name}</p>
            </ModalHeader>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-green-700 font-bold">Horas</p>
                <select onChange={(e) => onChangeDuration(e, 'hours')} value={selectedTime.hours} className="border border-green-700 focus:outline-0">
                  {Array.from({ length: 13 }).map((_, idx) => (
                    <option key={idx} value={idx}>{idx}</option>
                  ))}
                </select>
              </div>
              <label className="flex flex-col gap-2">
                <p className="text-green-700 font-bold">Minutos</p>
                <select onChange={(e) => onChangeDuration(e, 'minutes')} value={selectedTime.minutes} className="border border-green-700 focus:outline-0">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <option key={idx * 5} value={idx * 5}>{idx * 5}</option>
                  ))}
                </select>
              </label>
            </div>
            {error && selectedTime.hours + selectedTime.minutes === 0 && <span className="text-red-500 mt-3 block">La duración no puede ser cero</span>}
            <button onClick={setNewDuration} className="py-0.5 bg-green-700 mt-3 rounded-md text-white w-full font-bold cursor-pointer">
              Enviar
            </button>
          </Modal>
        }
      </>
      :
      <h1 className="text-red-500 font-bold">Ocurrió un error por favor complete los pasos anteriores</h1>
  )
}