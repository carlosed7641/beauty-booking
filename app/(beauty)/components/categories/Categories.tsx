import { Title } from '@/components'
import { ShopCardLayout } from '../shop-card/ShopCardLayout'
import { CategoryCard } from '../shop-card/CategoryCard'

export const Categories = () => {

    return (
        <section id="categories">
            <Title title="Buscar por categoría" />
            <ShopCardLayout cols={8}>
                <CategoryCard
                    name="Cortes"
                    iconId="store"
                />
                <CategoryCard
                    name="Peinados"
                    iconId="store"
                />
                <CategoryCard
                    name="Peinados"
                    iconId="store"
                />
            </ShopCardLayout>
        </section>
    )
}
