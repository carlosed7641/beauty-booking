import { Title } from '@/components'
import { ShopCardLayout, CategoryCard } from '..'
import { DEFAULT_SERVICES_LIST } from '@/util/const'

export const Categories = () => {

    return (
        <section id="categories">
            <Title title="Buscar por categoría" />
            <ShopCardLayout cols={8}>
                {
                    Object.keys(DEFAULT_SERVICES_LIST).map(category => (
                        <CategoryCard
                            key={category}
                            name={category}
                            iconId="store"
                        />
                    ))
                }
            </ShopCardLayout>
        </section>
    )
}
