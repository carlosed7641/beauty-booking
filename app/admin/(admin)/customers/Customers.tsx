'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
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

interface Props {
    customers: CustomerData[]
}

export const Customers = ({ customers }: Props) => {

    const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const openModal = useModal(state => state.openModal)

    const sortedCustomers = useMemo(() => {
        let result = [...customers]

        switch (activeTab) {
            case 'all': {
                const today = new Date()
                result = result
                    .map(c => {
                        const birthDate = new Date(c.birthDay as Date)
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
                result.sort((a, b) => a?.lastVisit?.getTime() - b?.lastVisit?.getTime())
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
            <div className="flex items-center gap-2 mb-3">
                <Link href="/admin" title="Volver">
                    <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                </Link>
                <h1 className="text-lg text-green-700 font-bold">Clientes</h1>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative flex flex-col">
                    {
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