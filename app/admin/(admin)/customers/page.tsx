'use client'

import { useEffect, useMemo, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { PiUsersThreeBold } from 'react-icons/pi'
import { RiUserHeartLine } from 'react-icons/ri'
import { TbHeartBroken } from 'react-icons/tb'
import { useModal } from '@/store'
import { SimpleTabs } from '@/components'
import { CustomerFormModal, CustomerInfoModal, CustomerList, CustomerSearch } from '../components'

const tabs = [
    { id: 'all', label: 'Todos', icon: PiUsersThreeBold },
    { id: 'most-visits', label: 'Mejores clientes', icon: RiUserHeartLine },
    { id: 'not-returned', label: 'No han vuelto', icon: TbHeartBroken }
]

// TODO: Get from backend
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

    const [customers, setCustomers] = useState<CustomerData[]>([])
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null)
    const [loadingCustomers, setLoadingCustomers] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const { openModal } = useModal()

    useEffect(() => {
        const customers = getCustomersData()
        setCustomers(customers)
        setLoadingCustomers(false)
    }, [])

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

    const filteredCustomers = useMemo(() => {
        if (!searchValue.trim()) return sortedCustomers
        const q = searchValue.toLowerCase()
        return sortedCustomers.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.phone.number.toLowerCase().includes(q)
        )
    }, [sortedCustomers, searchValue])

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
                                    <CustomerSearch
                                        searchValue={searchValue}
                                        setSearchValue={setSearchValue}
                                    />
                                    <SimpleTabs
                                        tabs={tabs}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                    <CustomerList
                                        activeTab={activeTab}
                                        customers={filteredCustomers}
                                        setSelectedCustomer={setSelectedCustomer}
                                    />
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
                <CustomerInfoModal
                    selectedCustomer={selectedCustomer}
                />
            }
            {
                openModal === 'CustomerUpdate' && selectedCustomer &&
                <CustomerFormModal
                    selectedCustomer={selectedCustomer}
                />
            }
        </>
    )
}