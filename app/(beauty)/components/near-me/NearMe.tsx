import { Title } from '@/components'
import { ShopCardLayout } from '../shop-card/ShopCardLayout'
import { ShopCard } from '../shop-card/ShopCard'

const cardExample2 = {
    href: '/',
    imageSrc: 'https://picsum.photos/250/150',
    imageWidth: 250,
    imageHeight: 150,
    shopName: 'Baber Shop Club'
}

export const NearMe = () => {
    return (
        <>
            <Title title="Cerca de ti" />
            <ShopCardLayout cols={6}>
                <ShopCard {...cardExample2} ratingCount={43} ratingPotins={4.5} />
                <ShopCard {...cardExample2} />
                <ShopCard {...cardExample2} />
            </ShopCardLayout>
        </>
    )
}
