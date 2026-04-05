'use client'

import { useState } from 'react'
import { RiUserMinusLine } from 'react-icons/ri'
import { Modal, ModalHeader } from '@/components'
import { useModal } from '@/store'

interface Employee {
    id: string
    name: string | null
}

interface Props {
    employees: Employee[]
}

export const Employees = ({ employees }: Props) => {

    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

    const handleClick = (employee: Employee) => {
        setSelectedEmployee(employee)
        setOpenModal('UnlinkEmployee')
    }

    return (
        <>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id} className="flex justify-between items-center   py-3 border-b border-b-zinc-200">
                        <p>{employee.name}</p>
                        <RiUserMinusLine onClick={() => handleClick(employee)} title="Desvincular" className="text-green-700 text-xl cursor-pointer" />
                    </li>
                ))}
            </ul>
            {
                openModal === 'UnlinkEmployee' && (
                    <Modal className="md:w-135! overflow-hidden!">
                        <ModalHeader>
                            <div>
                                ¿Está seguro que desea desvincular a <b>{selectedEmployee?.name}</b>?
                            </div>
                        </ModalHeader>
                        <div className="flex gap-2 w-full mt-2">
                            <button onClick={()=> {}} className="bg-red-500 py-1.5 hover:bg-red-600 text-white w-1/2 cursor-pointer rounded-md">Sí, desvincular</button>
                            <button onClick={() => setOpenModal(null)} className="bg-gray-500 py-1.5 hover:bg-gray-600 text-white w-1/2 cursor-pointer rounded-md">Cancelar</button>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}
