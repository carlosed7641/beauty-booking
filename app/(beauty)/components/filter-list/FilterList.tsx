import clsx from 'clsx'

interface Props {
    items: string[]
    selectedFilters: string[]
    handleClick: (item: string) => void
}

export const FilterList = ({ items, selectedFilters, handleClick }: Props) => {
    return (
    <ul className="flex flex-wrap items-center gap-2">
            {
                items.map(item => (
                    <li className={clsx(
                        "border border-green-700 px-3 rounded-full cursor-pointer hover:bg-green-700 hover:text-white transition-all",
                        {
                            "bg-green-700 text-white": selectedFilters.includes(item)
                        }
                    )}
                        onClick={() => handleClick(item)}
                        key={item}>{item}</li>
                ))
            }
        </ul>
    )
}
