import { Title } from '@/components'
import { ShopCardLayout, ShopCard } from '..'
import { getPopularShops } from '@/actions'
import { getReviews } from '@/helpers'

export const PopularShops = async () => {

    const data = await getPopularShops()

    const items = data.map(item => {

        const { ratingCount, ratingPotins } = getReviews(item.events)

        return {
            id: item.numberId,
            href: `/entity/${item.numberId}`,
            imageSrc: item.logo,
            shopName: item.name ?? '',
            ratingPotins,
            ratingCount
        }
    })

    if (items.length === 0) return null

    return (
        <>
            <Title title="Populares" />
            <ShopCardLayout cols={6}>
                {
                    items.map(item => (
                        <ShopCard key={item.id} {...item} />
                    ))
                }
            </ShopCardLayout>
        </>
    )
}
