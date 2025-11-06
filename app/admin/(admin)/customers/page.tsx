'use client'

import { useEffect, useMemo, useState } from 'react'
import { IoArrowBackOutline, IoSearch } from 'react-icons/io5'
import { Emotion, Modal, ModalHeader, SimpleTabs } from '@/components'
import { RiUserHeartLine } from 'react-icons/ri'
import { PiGenderMale, PiHairDryerLight, PiUsersThreeBold } from 'react-icons/pi'
import { TbGenderMale, TbHeartBroken } from 'react-icons/tb'
import { LuPhone } from 'react-icons/lu'
import { formaDateShort, formatDate, formatNumber, getDaysSince } from '@/helpers'
import { useModal } from '@/store'
import { FaWhatsapp } from 'react-icons/fa'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { BsCalendar2Check } from 'react-icons/bs'
import { AiOutlineDollarCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import Link from 'next/link'
import { BiSolidEdit } from 'react-icons/bi'
import { COUNTRIES } from '@/util/const'
import { IoMdCloseCircle, IoMdCloseCircleOutline } from 'react-icons/io'
import { CgSpinner } from 'react-icons/cg'

interface CustomerData extends Customer {
    visits: number
    lastVisit: Date
    total: number
    services: { id: string, name: string }[]
}

const tabs = [
    { id: 'all', label: 'Todos', icon: PiUsersThreeBold },
    { id: 'most-visits', label: 'Mejores clientes', icon: RiUserHeartLine },
    { id: 'not-returned', label: 'No han vuelto', icon: TbHeartBroken }
]

const events: EventDate[] = [
    {
        id: 'f445465',
        title: 'Cepillado',
        start: new Date(2025, 9, 21, 17, 45, 0),
        end: new Date(2025, 9, 21, 18, 30, 0),
        customer: {
            id: "125",
            name: "David Ortiz",
            phone: {
                indicator: '57',
                number: '3004394704'
            },
            birthDay: new Date(2000, 3, 26),
            gender: 'Masculino',
            reviewPointsAverage: 4.5
        },
        selectedService: {
            serviceId: "006",
            name: "Rayitos",
            duration: { hours: 0, minutes: 45 },
            price: 30_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro",
            photo: 'https://picsum.photos/64/64'
        },
        isAdminBooking: true,
        customerReview: 2,
        allDay: false,
        status: 'completed'
    },
    {
        id: 'f445468',
        title: 'Corte hombre',
        start: new Date(2024, 9, 21, 17, 45, 0),
        end: new Date(2024, 9, 21, 18, 30, 0),
        customer: {
            id: "124",
            name: "Juan Ortiz",
            phone: {
                indicator: '57',
                number: '300432334'
            },
            birthDay: new Date(2002, 5, 22),
            gender: 'Masculino',
            reviewPointsAverage: 3.5
        },
        selectedService: {
            serviceId: "007",
            name: "Corte hombre",
            duration: { hours: 1, minutes: 30 },
            price: 40_000
        },
        selectedProfessional: {
            id: 'abc',
            name: "Gregorio Carrena",
            photo: 'https://picsum.photos/64/64'
        },
        isAdminBooking: true,
        customerReview: 1,
        allDay: false,
        status: 'completed'
    },
    {
        id: 'f445467',
        title: 'Prueba',
        start: new Date(2025, 9, 20, 17, 45, 0),
        end: new Date(2025, 9, 20, 18, 30, 0),
        customer: {
            id: "133",
            name: "Albert Franco",
            phone: {
                indicator: '57',
                number: '3009797474'
            },
            birthDay: new Date(2001, 11, 12),
            gender: 'Masculino',
            reviewPointsAverage: 4.6
        },
        selectedService: {
            serviceId: "016",
            name: "Corte clásico",
            duration: { hours: 0, minutes: 30 },
            price: 35_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro",
            photo: 'https://picsum.photos/64/64'
        },
        isAdminBooking: true,
        customerReview: null,
        allDay: false,
        status: 'completed'
    },
    {
        id: 'f445475',
        title: 'Trenzas',
        start: new Date(2025, 9, 21, 17, 45, 0),
        end: new Date(2025, 9, 21, 18, 30, 0),
        customer: {
            id: "133",
            name: "Albert Franco",
            phone: {
                indicator: '57',
                number: '3009797474'
            },
            birthDay: new Date(2001, 11, 12),
            gender: 'Masculino',
            reviewPointsAverage: 4.6
        },
        selectedService: {
            serviceId: "777",
            name: "Cepillado con trenzas",
            duration: { hours: 1, minutes: 0 },
            price: 20_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro",
            photo: 'https://picsum.photos/64/64'
        },
        isAdminBooking: false,
        customerReview: 2,
        allDay: false,
        status: 'completed'
    }
]

const hints: Record<string, string> = {
    'all': 'Próximos cumpleaños',
    'most-visits': 'Clientes con más visitas',
    'not-returned': 'Días que han pasado desde su última visita'
}

const getCustomersData = () => {
    const customersMap = new Map<string, CustomerData>()

    // TODO: Make this is server side
    for (const { start, customer, selectedService } of events) {

        const { serviceId: id, price, name } = selectedService
        const existing = customersMap.get(customer.id)

        if (existing) {
            existing.visits++
            existing.lastVisit = new Date(start)
            existing.total += price
            const existingService = existing.services.some(s => s.id === id)

            if (!existingService) {
                existing.services.push({ id, name })
            }
        } else {
            customersMap.set(customer.id, {
                ...customer,
                visits: 1,
                lastVisit: new Date(start),
                total: price,
                services: [{ id, name }]
            })
        }

    }

    return Array.from(customersMap.values())
}

export default function CustomersPage() {

    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const [customers, setCustomers] = useState<CustomerData[]>([])
    const [filteredCustomers, setFilteredCustomers] = useState<CustomerData[]>([])
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null)
    const [formData, setFormData] = useState({ id: '', name: '', indicator: '', number: '' })
    const [searchValue, setSearchValue] = useState('')
    const [loadingCustomers, setLoadingCustomers] = useState(true)
    const { openModal, setOpenModal } = useModal()

    const sortedCustomers = useMemo(() => {
        let result = [...customers]

        switch (activeTab) {
            case 'all': {
                const today = new Date()
                result = result
                    .map(c => {
                        const birthDate = new Date(c.birthDay)
                        const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
                        if (nextBirthday < today) {
                            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
                        }
                        return { ...c, nextBirthday }
                    })
                    .sort((a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime())
                break
            }

            case 'most-visits':
                result.sort((a, b) => b.visits - a.visits)
                break

            case 'not-returned':
                result.sort((a, b) => a.lastVisit.getTime() - b.lastVisit.getTime())
                break
        }

        return result
    }, [customers, activeTab])


    useEffect(() => {
        const customers = getCustomersData()
        setCustomers(customers)
        setFilteredCustomers(customers)
        setLoadingCustomers(false)
    }, [])

    useEffect(() => {
        if (!customers.length) return

        if (searchValue) {
            const filtered = sortedCustomers.filter(c =>
                c.name.toLocaleLowerCase().includes(searchValue) ||
                c.phone.number.toLocaleLowerCase().includes(searchValue)
            )
            setFilteredCustomers(filtered)
        } else {
            setFilteredCustomers(sortedCustomers)
        }
    }, [activeTab, customers, searchValue])

    const getValueByActiveTab = (c: CustomerData) => {
        switch (activeTab) {
            case 'all':
                return formaDateShort(c.birthDay)
            case 'most-visits':
                return c.visits
            case 'not-returned':
                return getDaysSince(c.lastVisit)
        }
    }

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const showCustomerInfo = (c: CustomerData) => {
        setSelectedCustomer(c)
        setOpenModal('CustomerInfo')
    }

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // TODO: Save TO BD
        console.log(formData)
        setOpenModal(null)
    }

    const showCustomerForm = () => {
        if (!selectedCustomer) return
        const { id, name, phone: { indicator, number } } = selectedCustomer
        setFormData({ id, name, indicator, number })
        setOpenModal('CustomerUpdate')
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLocaleLowerCase()
        setSearchValue(value)
    }


    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Clientes</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative flex flex-col">
                    {
                        loadingCustomers ?
                            <div className="flex justify-center items-center my-16">
                                <AiOutlineLoading3Quarters className="text-5xl text-green-700 animate-spin my-8" />
                            </div>
                            :
                            customers.length > 0 ?
                                <>
                                    <div className="relative w-full md:w-[600px] flex self-center mb-6">
                                        <input className="border border-green-700 py-1 w-full rounded-full px-4 focus:outline-0" type="text" onChange={handleSearchChange} value={searchValue} placeholder="Buscar por nombre o celular" />
                                        {
                                            searchValue ?
                                                <IoMdCloseCircle onClick={() => setSearchValue('')} className="text-green-700 absolute top-2 right-4 text-lg cursor-pointer" />
                                                :
                                                <IoSearch className="text-green-700 absolute top-2 right-4 text-lg cursor-pointer" />
                                        }
                                    </div>
                                    <SimpleTabs
                                        tabs={tabs}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                    {
                                        filteredCustomers.length > 0 ?
                                            <ul className="flex flex-col gap-2 md:w-[600px] mt-4 md:mx-auto">
                                                <p className="self-end my-2 text-green-700">{hints[activeTab]}</p>
                                                {
                                                    filteredCustomers.map(c => (
                                                        <li className="flex items-center justify-between" key={c.id}>
                                                            <div onClick={() => showCustomerInfo(c)} className="flex flex-col cursor-pointer">
                                                                <p className="underline">{c.name}</p>
                                                                <p className="text-sm text-zinc-500 flex items-center gap-1">
                                                                    <LuPhone className="text-green-700" />
                                                                    {c.phone.number}
                                                                </p>
                                                            </div>
                                                            <span>{getValueByActiveTab(c)}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            :
                                            <div className="my-16 text-center">
                                                No hay clientes que coincidan con la búsqueda
                                            </div>
                                    }
                                </>
                                :
                                <div className="my-16 text-center">
                                    No tienes clientes registrados aún
                                </div>
                    }
                </div>
            </div>
            {
                openModal === 'CustomerInfo' && selectedCustomer &&
                <Modal className="md:overflow-hidden max-w-[700px]">
                    <ModalHeader>
                        <span className="text-green-700 font-bold text-xl">Cliente</span>
                    </ModalHeader>
                    <div className="flex flex-col gap-2 pb-3 border-b border-zinc-300">
                        <h3 className="text-2xl text-green-700 font-bold flex items-center justify-between md:justify-start md:gap-2">
                            {selectedCustomer.name}
                            <BiSolidEdit className="cursor-pointer" onClick={showCustomerForm} />
                        </h3>
                        <div className="flex">
                            <div className="flex flex-col pr-5 border-r border-zinc-300">
                                <span className="flex gap-1 items-center">
                                    <TbGenderMale className="text-green-700 text-lg" />
                                    {selectedCustomer.gender}
                                </span>
                                <Link href={`https://wa.me/${selectedCustomer.phone.number}`} target="_blank" className="flex gap-1 items-center">
                                    <FaWhatsapp className="text-green-500" />
                                    <span className="underline">{selectedCustomer.phone.number}</span>
                                </Link>
                                <span className="flex gap-1 items-center">
                                    <LiaBirthdayCakeSolid className="text-green-700" />
                                    {formatDate({ date: selectedCustomer.birthDay, month: 'short' })}
                                </span>
                            </div>
                            <div className="flex flex-col gap-3 pl-5 justify-center">
                                <div className="flex items-center gap-1">
                                    <Emotion averagePoints={selectedCustomer.reviewPointsAverage} />
                                    <div className="flex flex-col text-sm">
                                        <span className="font-bold">Reputación</span>
                                        <span>{selectedCustomer.reviewPointsAverage >= 2.5
                                            ? 'Buena' : selectedCustomer.reviewPointsAverage >= 1.5
                                                ? 'Regular' : 'Mala'
                                        }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-3">
                        <ul>
                            <p className="text-green-700 font-bold flex items-center gap-1 mb-2">
                                <BsCalendar2Check />
                                Visitas
                            </p>
                            <li>Te ha visitado {selectedCustomer.visits} {selectedCustomer.visits === 1 ? 'vez' : 'veces'}</li>
                            <li>
                                {
                                    (() => {
                                        const days = getDaysSince(selectedCustomer.lastVisit)
                                        return `La última vez que te visitó fue ${days === 0 ? 'hoy' : days === 1 ? `hace ${days} día` : `hace ${days} días`}`
                                    })()
                                }
                            </li>
                        </ul>
                        <ul>
                            <p className="text-green-700 flex items-center gap-1 font-bold mb-2">
                                <AiOutlineDollarCircle className="text-lg" />
                                Ganancias
                            </p>
                            <li>Te ha comprado ${formatNumber(selectedCustomer.total.toString())}</li>
                        </ul>
                        <ul>
                            <p className="text-green-700 flex items-center gap-1 font-bold mb-2">
                                <PiHairDryerLight className="text-lg" />
                                Servicios utilizados
                            </p>
                            {selectedCustomer.services.map(s => <li className="list-disc list-inside pl-3" key={s.id}>{s.name}</li>)}
                        </ul>
                    </div>
                </Modal>
            }
            {
                openModal === 'CustomerUpdate' && formData.id &&
                <Modal className="md:overflow-hidden max-w-[700px]">
                    <ModalHeader>
                        <div className="flex items-center gap-2 text-green-700 font-bold text-xl">
                            <IoArrowBackOutline className="cursor-pointer" onClick={() => setOpenModal('CustomerInfo')} />
                            Editor de clientes
                        </div>
                    </ModalHeader>
                    <form onSubmit={onSubmitForm} className="flex flex-col gap-4">
                        <label>
                            <span className="text-green-700">Nombre *</span>
                            <input onChange={handleChangeField} type="text" disabled value={formData.name} name="name" className="w-full border border-green-700 px-3 py-1 rounded-md disabled:bg-zinc-100 focus:outline-0" />
                        </label>
                        <div>
                            <label className="text-green-700" htmlFor="number">Número de contacto</label>
                            <div className="flex gap-2">
                                <select onChange={handleChangeField} value={formData.indicator} className="w-[100px] border border-green-700 px-3 py-1 rounded-md focus:outline-0" name="indicator">
                                    {COUNTRIES.map(country => <option key={country.indicator} value={country.indicator}>+{country.indicator}</option>)}
                                </select>
                                <input onChange={handleChangeField} className="w-full border border-green-700 px-3 py-1 rounded-md focus:outline-0" type="tel" name="number" id="number" value={formData.number} />
                            </div>
                        </div>
                        <input type="submit" className="bg-green-700 font-bold mt-2 py-1.5 px-2 rounded justify-center flex self-end text-white cursor-pointer hover:bg-green-800 w-full md:w-36" value="Guardar" />
                    </form>
                </Modal>
            }
        </>
    )
}