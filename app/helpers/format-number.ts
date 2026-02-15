export const formatNumber = (value: string) => {
    const number = value.toString()
    // Delete everything that is not a number
    let cleanNumber = number.replace(/\D/g, '')

    // Remove leading zeros, but leave a single 0 if that's all there is
    cleanNumber = cleanNumber.replace(/^0+(?!$)/, '')
    // Format with mil points
    return cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const getRawNumber = (formatted: string) => formatted.replace(/\./g, '')