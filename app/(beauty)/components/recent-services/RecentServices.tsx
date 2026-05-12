import { Title } from '@/components'
import { ShopCardLayout, ShopCard } from '..'

interface RecentService {
  href: string
  imageSrc: string | null
  ratingPotins: number
  ratingCount: number
  shopName: string
  serviceName: string
  ctaData: {
    serviceId: string
    name: string
    price: number
    duration: {
      hours: number
      minutes: number
    }
  }
}

interface Props {
  services: RecentService[]
}

export const RecentServices = ({ services }: Props) => {

  return (
    <section id="recent-services">
      <Title title="Tus servicios recientes" />
      <ShopCardLayout>
        {services.map((service, index) => <ShopCard key={index} {...service} />)}
      </ShopCardLayout>
    </section>
  )
}
