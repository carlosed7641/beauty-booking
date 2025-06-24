'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { GrGallery } from 'react-icons/gr'
import { FilterList } from '../..'

interface Props {
    categoryMap: Record<string, {
        category: string
        image: string
        author: string
    }[]>
    handleSelectGallery: (category: string) => void
}

export const WorkSamples = ({ categoryMap, handleSelectGallery }: Props) => {

    const initialSamples = Object.entries(categoryMap)
    const filters = Object.keys(categoryMap)

    const [filterSamples, setFilterSamples] = useState(initialSamples)
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const handleClickFilter = (filter: string) => {

        const filters = selectedFilters.includes(filter)
            ? selectedFilters.filter(sf => sf != filter)
            : [...selectedFilters, filter]
        setSelectedFilters(filters)
    }

    useEffect(() => {
        if (!selectedFilters.length) {
            setFilterSamples(initialSamples)
            return
        }
        const newSamples = initialSamples.filter(sample => selectedFilters.includes(sample[0]))
        setFilterSamples(newSamples)
    }, [selectedFilters])

    return (
        <>
            <div className="mt-3">
                <FilterList handleClick={handleClickFilter} selectedFilters={selectedFilters} items={filters} />
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-7 md:gap-3 mt-4">
                {filterSamples.map(
                    ([category, sample]) =>
                        sample &&
                        sample.length > 0 && (
                            <div
                                onClick={() => handleSelectGallery(category)}
                                key={category}
                                className="flex flex-col bg-zinc-100 cursor-pointer relative"
                            >
                                <Image
                                    className="w-auto"
                                    title={category}
                                    width={160}
                                    height={170}
                                    src={sample[0].image}
                                    alt={category}
                                />
                                {sample.length > 1 && (
                                    <div className="absolute top-2 right-2 bg-zinc-100 p-1">
                                        <GrGallery />
                                    </div>
                                )}
                                <div className="p-2">
                                    <p className="font-bold">{category}</p>
                                    <span className="block truncate">{sample[0].author}</span>
                                </div>
                            </div>
                        )
                )}
            </div>
        </>
    )
}