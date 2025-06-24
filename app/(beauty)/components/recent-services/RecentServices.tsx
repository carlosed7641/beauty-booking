import { Title } from '@/components'
import { ShopCardLayout, ShopCard } from '..'
import { entities, serviceList } from '@/util/fake-data'

export const RecentServices = () => {

  const recentServicesId = ['001', '004'] //TODO: Get services id by user Id
  const services = serviceList
    .flatMap(({ services, entityId }) => services.map(s => ({
      ...s,
      entityId
    })))
    .filter(s => recentServicesId.includes(s.serviceId))
    .map(s => {
      const { id, imageSrc, reviews, name: shopName } = entities.find(e => e.id === s.entityId)!
      return {
        href: `/entity/${id}`,
        imageSrc,
        imageWidth: 300,
        imageHeight: 108,
        ratingPotins: reviews.points,
        ratingCount: reviews.counts,
        shopName,
        serviceName: s.name,
        ctaData: s
      }
    })

  return (
    <section id="recent-services">
      <Title title="Tus servicios recientes" />
      <ShopCardLayout>
        {services.map((service, index) => <ShopCard key={index} {...service} />)}
      </ShopCardLayout>
    </section>
  )
}
