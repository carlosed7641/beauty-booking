interface WorkSampleImage {
    id: string
    main: boolean | null
    url: string
    file?: File
}
interface WorkSample {
    id: string
    category: string
    name: string
    images: WorkSampleImage[]
    updatedAt?: Date
    authorId: string
    entityId: string
}