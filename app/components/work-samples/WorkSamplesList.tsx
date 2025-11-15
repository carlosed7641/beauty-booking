'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { GrGallery } from 'react-icons/gr'
import { FilterList } from '../../(beauty)/components'

interface Props {
    workSamples: WorkSample[]
    handleSelectGallery: (id: string, name: string) => void
    hideFilters?: boolean
    hideName?: boolean
}

export const WorkSamplesList = ({ workSamples, handleSelectGallery, hideFilters, hideName }: Props) => {

    const filters = workSamples.map(({ name }) => name)

    const [filterSamples, setFilterSamples] = useState(workSamples)
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const handleClickFilter = (filter: string) => {

        const filters = selectedFilters.includes(filter)
            ? selectedFilters.filter(sf => sf != filter)
            : [...selectedFilters, filter]

        setSelectedFilters(filters)
    }

    useEffect(() => {
        if (!selectedFilters.length) {
            setFilterSamples(workSamples)
            return
        }
        const newSamples = workSamples.filter(sample => selectedFilters.includes(sample.name))
        setFilterSamples(newSamples)
    }, [selectedFilters])

    return (
        <>
            {!hideFilters && workSamples.length > 2 &&
                <div className="mt-3">
                    <FilterList handleClick={handleClickFilter} selectedFilters={selectedFilters} items={filters} />
                </div>
            }
            <div className="flex flex-wrap gap-2 mt-4">
                {filterSamples.map(sample => {
                    const mainImage = sample.images.find(image => image.mainImage) || sample.images[0]
                    return (
                        <div
                            onClick={() => handleSelectGallery(sample.id, sample.name)}
                            key={sample.id}
                            className="flex flex-col bg-zinc-100 cursor-pointer relative rounded-md w-[180px] shrink-0"
                        >
                            <Image
                                className="w-auto rounded-t-md"
                                title={sample.name}
                                width={160}
                                height={170}
                                src={mainImage.url}
                                alt={sample.name}
                            />
                            {sample.images.length > 1 && (
                                <div className="absolute top-2 right-2 bg-zinc-100 p-1">
                                    <GrGallery />
                                </div>
                            )}
                            <div className="p-2">
                                <p className="font-bold">{sample.name}</p>
                                {!hideName && <span className="block truncate">{sample.author}</span>}
                            </div>
                        </div>
                    )
                }

                )}
            </div>
        </>
    )
}