import { PROFESSIONAL_SETTINGS_OPTIONS } from '@/util/const'

interface Props {
    selectedOption: number
    setSelectedOption: (value: React.SetStateAction<number>) => void
}

export const SelectOption = ({ selectedOption, setSelectedOption }: Props) => {
    return (
        <ul className="flex justify-center gap-2 mb-5">
            {PROFESSIONAL_SETTINGS_OPTIONS.map(({ title, icon: Icon }, index) => (
                <li key={index}>
                    <button onClick={() => setSelectedOption(index)} aria-selected={selectedOption === index} title={title} className="aria-selected:bg-green-700 aria-selected:text-white h-13 w-13 flex items-center justify-center border border-zinc-200 shadow-md rounded-full text-2xl text-green-700 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white transition-all cursor-pointer focus:outline-0 ">
                        <Icon />
                    </button>
                </li>
            ))}
        </ul>
    )
}
