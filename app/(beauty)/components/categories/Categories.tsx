import { Title } from '@/components'
import { ShopCardLayout, CategoryCard } from '..'

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
