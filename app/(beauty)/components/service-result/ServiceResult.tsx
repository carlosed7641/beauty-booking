'use client'

import { useState } from 'react'
import { useSelectedFilters } from '@/store'
import { FilterList } from '../filter-list/FilterList'
import { ServiceResultList } from './ServiceResultList'
import { ServiceFilters } from '../service-filters/ServiceFilters'
import { ServiceOrder } from '../service-order/ServiceOrder'
import { orderBy } from '@/helpers'
import { getServiceResults } from '@/helpers/get-service-results'
import { serviceList } from '@/util/fake-data'

export const ServiceResult = () => {

    const { selectedFilters, setSelectedFilters } = useSelectedFilters()
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

    const results = selectedFilters.length ?
        serviceList.filter(s => selectedFilters.includes(s.category.toLowerCase())).flatMap(getServiceResults) :
        serviceList.flatMap(getServiceResults)

    const orderedResults = orderBy(results, selectedOrder ?? '')

    const handleClickFilter = (filter: string) => {
        setSelectedFilters(selectedFilters.filter(item => item !== filter))
    }

    return (
        <>
            <div className="w-full md:w-auto flex items-center gap-3 mb-3 justify-center md:justify-self-end px-5 md:px-0">
                <ServiceOrder selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
                <ServiceFilters />
            </div>
            <div className="flex flex-col gap-4 mb-5">
                {selectedFilters.length > 0 &&
                    <>
                        <span className="flex text-xl text-green-700">Filtros seleccionados</span>
                        <FilterList items={selectedFilters}
                            handleClick={handleClickFilter}
                            selectedFilters={selectedFilters} />
                    </>
                }
            </div>
            {
                orderedResults.length ? <ServiceResultList services={orderedResults} />
                    :
                    <div>
                        No se encontraron servicios asociados{' '}
                        {selectedFilters.length > 1 ? 'las categorías indicadas' : 'la categoría indicada'}
                    </div>
            }
        </>
    )
}
