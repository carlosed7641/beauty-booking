import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { MdAddCircleOutline } from 'react-icons/md'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { CgCloseO } from 'react-icons/cg'
import { useSteps } from '../../store'
import { SERVICES_LIST } from '@/util/const'

export const StepTwo = () => {

  const { data, setData, showErrors } = useSteps()
  const [customFields, setCustomFields] = useState<{ [key: string]: string[] }>({})
  const [serviceList, setServiceList] = useState<{ [key: string]: string[] }>(SERVICES_LIST)

  const handleAddService = (key: string, value: string) => {

    const existingServices = data.stepTwo.selectedServices?.[key] ?? []
    let selectedServices: { [key: string]: string[] } | null = { ...data.stepTwo.selectedServices }

    const updatedServices = existingServices.includes(value)
      ? existingServices.filter(s => s !== value)
      : [...existingServices, value]


    if (updatedServices.length > 0) {
      selectedServices[key] = updatedServices
    } else {
      delete selectedServices[key]
    }

    selectedServices = Object.keys(selectedServices).length > 0 ? selectedServices : null

    setData({
      ...data,
      stepTwo: {
        selectedServices
      }
    })
  }

  const handleAddCustomService = (index: number, name: string) => {
    const value = customFields[name].find((_, idx) => idx === index) ?? ''

    if (value.length > 0) {
      if (!data.stepTwo.selectedServices?.[name]?.includes(value)) {

        if (!serviceList[name].includes(value)) {
          setServiceList(oldServices => {

            const newValue = {
              ...oldServices,
              [name]: [...oldServices[name], value]
            }

            localStorage.setItem('service-list', JSON.stringify(newValue))
            return newValue
          })
          handleAddService(name, value)
        }
      }

      handleDeleteField(index, name)
    }
  }

  const handleDeleteField = (index: number, name: string) => {
    setCustomFields(prev => {
      const updatedArray = prev[name].filter((_, idx) => idx !== index)
      return {
        ...prev,
        [name]: updatedArray
      }
    })
  }

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>, idx: number, name: string) => {

    const newValue = e.target.value
    setCustomFields(prev => {
      const updatedFields = prev[name]?.map((value, index) => index === idx ? newValue : value) || []

      return {
        ...prev,
        [name]: updatedFields
      }
    })
  }

  // TODO: Fix
  useEffect(() => {
    if (localStorage.getItem('service-list')) {
      const serviceList = localStorage.getItem('service-list')
      setServiceList(JSON.parse(serviceList!))
    } else {
      setServiceList(SERVICES_LIST)
    }
  }, [])

  return (
    <>
      <div className="grid md:grid-cols-4 md:gap-6">
        {
          Object.entries(serviceList).map(([name, services]) => (
            <div key={name} className="flex flex-col gap-4 border-b border-b-zinc-200 py-4 last:border-none md:border-none md:p-0">
              <p className="font-bold text-green-700">{name}</p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  {services.map(service => (
                    <div key={name + service} onClick={() => handleAddService(name, service)}
                      className={
                        clsx(
                          "py-1 px-2 rounded-full border border-green-700 text-sm transition-all hover:bg-green-700 hover:text-white cursor-pointer",
                          {
                            "bg-green-700 text-white": data.stepTwo.selectedServices?.[name]?.includes(service)
                          }
                        )
                      }>
                      {service}
                    </div>
                  ))}
                </div>
                {
                  customFields[name]?.map((value, idx) => (
                    <div key={`${name}-${idx}`} className="flex items-center gap-2">
                      <input onChange={(e) => handleChangeField(e, idx, name)} value={value} type="text" placeholder="Nombre del servicio" className="border border-zinc-300 rounded-full px-3 py-0.5" />
                      <button onClick={() => handleAddCustomService(idx, name)} disabled={customFields[name].find((_, index) => idx === index)?.length === 0} className="rounded-full bg-blue-900 text-white p-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        <FaRegCircleCheck />
                      </button>
                      <button onClick={() => handleDeleteField(idx, name)} className="rounded-full cursor-pointer bg-blue-900 opacity-90 text-white p-1.5">
                        <CgCloseO />
                      </button>
                    </div>
                  ))
                }
                <button onClick={() => setCustomFields(prev => (
                  {
                    ...prev,
                    [name]: prev[name] ? [...prev[name], ''] : ['']
                  }
                ))} className="flex gap-2 items-center w-fit text-white py-1 px-4 rounded-full bg-blue-900 opacity-90 hover:opacity-100 transition-all text-sm cursor-pointer">
                  <MdAddCircleOutline className="text-lg" />
                  Agrega otro
                </button>
              </div>
            </div>
          ))
        }
      </div>
      {
        showErrors && !data.stepTwo.selectedServices &&
        <div className="hidden md:block mt-8 text-red-500 text-center">
          Debes elegir mínimo un servicio
        </div>
      }
    </>
  )
}