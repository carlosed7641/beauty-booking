export const getReviews = (
    events: {
        id?: string
        customerRating: number | null
    }[]
) => {
    const reviews = events
        .filter(ev => ev.customerRating)
        .map(ev => ({
            id: ev.id,
            points: ev.customerRating!
        }))

    return {
        ratingPotins: (reviews.reduce((acc, current) => acc + current.points, 0) / reviews.length),
        ratingCount: reviews.length
    }
}