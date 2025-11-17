type TimeOption = 'day' | 'week' | 'fortnight' | 'month' | 'year' | 'range'
interface TimeOptionItem {
    id: TimeOption
    label: string
}