interface Image {
    cover: { url: string, file?: File[] } | null
    logo: { url: string, file?: File[] } | null
}

interface ShopProfile {
    name: string
    shopType: string[]
    images: Image
    address: string
    addressReference: string
}
