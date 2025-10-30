import clsx from 'clsx'

type Option = { id: string, label: string }

interface Props {
    options: Option[]
    activeOption: Option
    setActiveOption: React.Dispatch<React.SetStateAction<Option>>
}

export const OptionsSelector = ({ options, activeOption, setActiveOption }: Props) => {
    return (
        <ul className="flex overflow-scroll md:overflow-auto md:flex-wrap md:justify-center gap-2 scroll-none">
            {
                options.map(option => (
                    <li title={option.label} onClick={() => setActiveOption(option)} key={option.id}
                        className={
                            clsx(
                                "flex items-center px-4 py-1 border rounded-full border-green-700 text-green-700 hover:bg-green-700 hover:text-white text-sm cursor-pointer",
                                { "bg-green-700 text-white": activeOption.id === option.id }
                            )
                        }>{option.label}</li>
                ))
            }
        </ul>
    )
}
