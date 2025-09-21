'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
    totalOptions: number
    isOpenOptions: (isOpen: boolean) => void
}

export const useKeyboardOptions = ({ totalOptions, isOpenOptions }: Props) => {

    const [focusedIndex, setFocusedIndex] = useState(-1)
    const optionRef = useRef<(HTMLElement | null)[]>([])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                isOpenOptions(false)
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setFocusedIndex((prev) => {
                    const next = (prev + 1) % totalOptions
                    optionRef.current[next]?.focus()
                    return next
                })
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault()
                setFocusedIndex((prev) => {
                    if (prev === -1) {
                        prev = 0
                    }
                    const next = (prev - 1 + totalOptions) % totalOptions
                    optionRef.current[next]?.focus()
                    return next
                })
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [totalOptions])

    return {
        optionRef,
        focusedIndex
    }
}