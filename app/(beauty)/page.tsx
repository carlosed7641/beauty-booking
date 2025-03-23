import Image from "next/image"
import { FaStar } from "react-icons/fa";
import { IoStorefrontOutline } from "react-icons/io5";
import { ShopCardLayout } from "./components/shop-card/ShopCardLayout";
import { ShopCard } from "./components/shop-card/ShopCard";
import { Title } from "@/components";
import { CategoryCard } from "./components/shop-card/CategoryCard";

export default function HomePage() {

  const cardExample1 = {
    href: '/',
    imageSrc: 'https://picsum.photos/300/180',
    imageWidth: 300,
    imageHeight: 180,
    ratingPotins: 4.7,
    ratingCount: 255,
    shopName: 'Acicalate Vip',
    serviceName: 'Corte hombre',
    ctaUrl: '/acicalate-vip/corte-hombre',
  }

  const cardExample2 = {
    href: '/',
    imageSrc: 'https://picsum.photos/250/150',
    imageWidth: 250,
    imageHeight: 150,
    shopName: 'Baber Shop Club'
  }

  return (
    <div>
      <Title title="Tus servicios recientes" />
      <ShopCardLayout>
        <ShopCard {...cardExample1} />
        <ShopCard {...cardExample1} />
        <ShopCard {...cardExample1} />
      </ShopCardLayout>

      <Title title="Buscar por categoría" />
      <ShopCardLayout cols={8}>
        <CategoryCard
          name="Peinados"
          href="/"
          iconId="store"
        />
        <CategoryCard
          name="Peinados"
          href="/"
          iconId="store"
        />
        <CategoryCard
          name="Peinados"
          href="/"
          iconId="store"
        />
      </ShopCardLayout>

      <Title title="Cerca de ti" />
      <ShopCardLayout cols={6}>
        <ShopCard {...cardExample2} ratingCount={43} ratingPotins={4.5} />
        <ShopCard {...cardExample2} />
        <ShopCard {...cardExample2} />
      </ShopCardLayout>
    </div>
  );
}