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
    // author: string
    updatedAt: Date
    authorId: string
    entityId: string
}