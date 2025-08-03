import { MONTHS } from "@/util/const"

export const getAbbreviatedDate = (date: string) => {
    const formatDate = new Date(date)
    const monthIndex = formatDate.getMonth()
    const year = formatDate.getFullYear()

    return `${MONTHS[monthIndex].month} ${year}`
}