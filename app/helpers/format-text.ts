export const shortName = (name: string) => {
    return name.length > 8 ? name.slice(0, 8) + '...' : name
}

export const showInitials = (text: string) => {
    if (!text) return ''
    const words = text.trim().split(/\s+/)
    return words.slice(0, 2).map(word => word[0]?.toUpperCase()).join('')
}