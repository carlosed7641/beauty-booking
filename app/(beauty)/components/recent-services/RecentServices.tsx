import { Title } from '@/components'
import { ShopCardLayout } from '../shop-card/ShopCardLayout'
import { ShopCard } from '../shop-card/ShopCard'

const cardExample1 = {
  href: "/",
  imageSrc: "https://picsum.photos/300/180",
  imageWidth: 300,
  imageHeight: 180,
  ratingPotins: 4.7,
  ratingCount: 255,
  shopName: "Acicalate Vip",
  serviceName: "Corte hombre",
  ctaUrl: "/acicalate-vip/corte-hombre"
}

export const RecentServices = () => {
  return (
    <section id="recent-services">
      <Title title="Tus servicios recientes" />
      <ShopCardLayout>
        <ShopCard {...cardExample1} />
        <ShopCard {...cardExample1} />
        <ShopCard {...cardExample1} />
      </ShopCardLayout>
    </section>
  )
}
