import { v2 as cloudinary } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const uploadImage = async (images: File[]) => {

    try {

        const uploadPromises = images.map(async (image) => {

            try {
                const buffer = await image.arrayBuffer()
                const base64Image = Buffer.from(buffer).toString('base64')

                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then(r => r.secure_url)
            } catch (error) {
                console.log(error)
                return null
            }

        })

        const uploadedImages = await Promise.all(uploadPromises)
        return uploadedImages

    } catch (error) {
        console.log(error)
        return null
    }
}