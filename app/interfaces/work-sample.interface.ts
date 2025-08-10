interface WorkSampleImage {
    id: string
    mainImage: boolean
    url: string
}
interface WorkSample {
    id: string
    category: string
    name: string
    images: WorkSampleImage[]
    author: string
    authorId: string
    entityId: string
}