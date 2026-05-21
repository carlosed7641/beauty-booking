'use client'

import { useState } from 'react'
import { useSelectedFilters } from '@/store'
import { FilterList, ServiceResultList, ServiceFilters, ServiceOrder } from '..'
import { orderBy } from '@/helpers'

export const ServiceResult = ({ results }: { results: ServiceResult[] }) => {

    const selectedFilters = useSelectedFilters(state => state.selectedFilters)
    const setSelectedFilters = useSelectedFilters(state => state.setSelectedFilters)
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

    const filteredResults =
        selectedFilters.length > 0
            ? results.filter(result => selectedFilters.includes(result.category))
            : results

    const orderedResults = selectedOrder
        ? orderBy(filteredResults, selectedOrder)
        : filteredResults


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
                        <FilterList
                            items={selectedFilters}
                            handleClick={handleClickFilter}
                            selectedFilters={selectedFilters}
                        />
                    </>
                }
            </div>
            {
                results.length > 0
                    ?
                    orderedResults.length > 0 ? <ServiceResultList services={orderedResults} />
                        :
                        <div>
                            No se encontraron servicios asociados a {' '}
                            {selectedFilters.length > 1 ? 'las categorías indicadas' : 'la categoría indicada'}
                        </div>
                    :
                    <div>
                        No se encontraron servicios cercarnos
                    </div>
            }
        </>
    )
}