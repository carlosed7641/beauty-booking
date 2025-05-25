import { ChangeEvent, MouseEvent, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { IoMdSearch } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5'

interface Props {
    value: string
    onChange: (value: string) => void
    setOpenResults: (value: boolean) => void
}

export const SearchInput = ({ value, onChange, setOpenResults }: Props) => {

    const router = useRouter()
    const wrapperRef = useRef<HTMLDivElement>(null)

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>
    ) => {
        const target = e.target as HTMLInputElement
        onChange(target.value)
        if (target.value) {
            setOpenResults(true)
        }
    }

    const handleClickSearchIcon = () => {
        if (value) {
            setOpenResults(true)
        }
    }

    const handleCloseIcon = () => {
        onChange('')
        setOpenResults(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/search/entity?q=${value}`)
        setOpenResults(false)
    }

    useEffect(() => {

        const handleDocumentClick = (e: Event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpenResults(false)
            }
        }

        document.addEventListener('click', handleDocumentClick)

        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [])

    return (
        <div ref={wrapperRef}>
            <form onSubmit={handleSubmit}>
                <input
                    value={value}
                    type="text"
                    onClick={handleChange}
                    onChange={handleChange}
                    placeholder="Buscar negocio"
                    className="bg-white w-full rounded-sm px-3 p-1 focus-visible:outline-0 shadow-sm"
                />
            </form>
            <div className="flex gap-1 items-center absolute right-2.5 top-1.5 ">
                {
                    value &&
                    <IoCloseSharp
                        size={20}
                        onClick={handleCloseIcon}
                        className="cursor-pointer"
                    />
                }
                <IoMdSearch
                    size={20}
                    onClick={handleClickSearchIcon}
                    className="cursor-pointer"
                />
            </div>
        </div>
    )
}
