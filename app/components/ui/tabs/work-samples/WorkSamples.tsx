import Image from 'next/image'
import { GrGallery } from 'react-icons/gr'

interface Props {
    categoryMap: Record<string, {
        category: string
        image: string
        author: string
    }[]>
    handleSelectGallery: (category: string) => void
}

export const WorkSamples = ({ categoryMap, handleSelectGallery }: Props) => {
    return (
        <div className="grid grid-cols-3 gap-2 md:grid-cols-7 md:gap-3 mt-4">
            {Object.entries(categoryMap).map(
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
    )
}
