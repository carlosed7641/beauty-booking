import clsx from 'clsx'

interface Props {
    foundationYear: number
    date: Date
    onChangeDate: (value: number, type: "month" | "year") => void
}

export const YearList = ({ foundationYear, date, onChangeDate }: Props) => {

    const years = new Date().getFullYear() - foundationYear + 1
    return (
        <ul className="flex flex-col md:grid md:grid-cols-6 gap-2">
            {
                Array.from({ length: years }, (_, idx) => {
                    const year = foundationYear + idx
                    return (
                        <li onClick={() => onChangeDate(year, 'year')} key={idx} className={
                            clsx(
                                "w-full md:text-center text-white rounded-md px-3 py-2 cursor-pointer hover:bg-green-700",
                                {
                                    "bg-zinc-400": year !== date.getFullYear(),
                                    "bg-green-700": year === date.getFullYear()
                                }
                            )
                        }>{year}</li>
                    )
                })
            }
        </ul>
    )
}
