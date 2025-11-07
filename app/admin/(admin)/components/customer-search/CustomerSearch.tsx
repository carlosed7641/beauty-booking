import { IoMdCloseCircle } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'

interface Props {
    searchValue: string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export const CustomerSearch = ({ searchValue, setSearchValue }: Props) => {

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLocaleLowerCase()
        setSearchValue(value)
    }

    return (
        <div className="relative w-full md:w-[600px] flex self-center mb-6">
            <input className="border border-green-700 py-1 w-full rounded-full px-4 focus:outline-0" type="text" onChange={handleSearchChange} value={searchValue} placeholder="Buscar por nombre o celular" />
            {
                searchValue ?
                    <IoMdCloseCircle onClick={() => setSearchValue('')} className="text-green-700 absolute top-2 right-4 text-lg cursor-pointer" />
                    :
                    <IoSearch className="text-green-700 absolute top-2 right-4 text-lg cursor-pointer" />
            }
        </div>
    )
}
