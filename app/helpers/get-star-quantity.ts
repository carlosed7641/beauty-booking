export const getStars = (value: number) => {

    const decimal = value % 1

    if (decimal === 0) return { fullStars: value, half: false }
    if (decimal > 0.5) return { fullStars: Math.ceil(value), half: false }

    return { fullStars: Math.floor(value), half: true }
}
