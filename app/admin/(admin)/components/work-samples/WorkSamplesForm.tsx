'use client'

import { SetStateAction, useState } from 'react'
import Image from 'next/image'
import { IoMdCloseCircle } from 'react-icons/io'
import { Field, UploadImage } from '@/components'
import { INITAL_WS_FORM_DATA, DEFAULT_SERVICES_LIST } from '@/util/const'
import { createWorkSample, deleteWorkSample, updateWorkSample } from '@/actions'
import { useRouter } from 'next/navigation'

interface Props {
    formData: WorkSample
    entityId: string
    authorId: string
    setFormData: (value: SetStateAction<WorkSample>) => void
    setShowForm: (value: boolean | string | null) => void
    hideHint?: boolean
}

export const WorkSamplesForm = ({ formData, setFormData, setShowForm, hideHint, entityId, authorId }: Props) => {

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [deletedImages, setDeletedImages] = useState<string[]>([])
    const router = useRouter()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError(false)
        setIsLoading(true)
        const { name, category, images } = formData
        const data = { name, category, entityId, authorId, images }

        try {

            formData.id
                ? await updateWorkSample({ ...data, id: formData.id }, deletedImages)
                : await createWorkSample(data)
            
            router.refresh()   
            restartForm()
        } catch {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        const files: WorkSampleImage[] = Array.from(e.target.files).map((file, idx) => ({
            id: crypto.randomUUID(),
            main: !formData.images.length && idx === 0,
            file,
            url: URL.createObjectURL(file),
        }))

        setFormData(prev => ({
            ...prev,
            [e.target.name]: [...prev.images, ...files]
        }))
    }

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const restartForm = () => {
        setError(false)
        setShowForm(false)
        setFormData(INITAL_WS_FORM_DATA)
    }

    const onChangeMainImage = (id: string) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.map(image => ({
                ...image,
                main: image.id === id
            }))
        }))
    }


    const onDeleteImage = (image: WorkSampleImage) => {

        if (formData.id && image.url.startsWith('https')) {
            setDeletedImages(prev => ([...prev, image.id]))
        }

        setFormData(prev => {
            const wasMainImage = prev.images.find(img => img.id === image.id)?.main
            const filteredImages = prev.images.filter(img => img.id !== image.id)

            if (wasMainImage && filteredImages.length > 0) {
                filteredImages[0] = { ...filteredImages[0], main: true }
            }

            return {
                ...prev,
                images: filteredImages
            }
        })
    }


    const onDeleteSample = async () => {
        setIsLoading(true)
        setError(false)

        try {
            await deleteWorkSample(formData.id)
            router.refresh()   
            restartForm()
        } catch {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }


    const isFormValid = formData.name && formData.category && formData.images.length > 0

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!hideHint && <span className="text-zinc-500 text-sm">{formData.id ? 'Editar' : 'Agregar'} Muestra de trabajo</span>}
            <Field label="Nombre">
                <input name="name" onChange={handleFieldChange} value={formData.name} placeholder="Ej: Taper medio" className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
            </Field>
            <Field label="Tipo de servicio" hint="¿Qué tipo de servicio son las fotos de esta muestra de trabajo?">
                <select name="category" onChange={handleFieldChange} value={formData.category} className="border border-green-700 p-1 rounded-md focus:outline-0 mt-2">
                    <option value="" disabled>Seleciona una categoría</option>
                    {
                        Object.keys(DEFAULT_SERVICES_LIST).map(category => <option key={category} value={category}>{category}</option>)
                    }
                </select>
            </Field>
            {formData.images.length > 0 && <span className="text-zinc-500 text-sm">Toca la imagen que quieres que sea la principal</span>}
            <div className="flex flex-wrap gap-2">
                {
                    formData.images.map(image => (
                        <div onClick={() => onChangeMainImage(image.id)} className="relative cursor-pointer w-1/5" key={image.id}>
                            <Image className="rounded-sm w-full aspect-187/199 object-cover" height={150} width={150} alt={formData.name} src={image.url} />
                            {
                                image.main && <span className="absolute top-3 block px-2 py-1 bg-green-700 text-white text-xs rounded-tr-full rounded-br-full">Principal</span>
                            }
                            <IoMdCloseCircle onClick={(e) => {
                                e.stopPropagation()
                                onDeleteImage(image)
                            }} className="absolute bottom-1 right-1 text-2xl fill-white" />
                        </div>
                    ))
                }
                <UploadImage className="aspect-187/199 w-1/5" name="images" multiple handleChange={handleFileChange} />
            </div>
            {!formData.images.length && <span className="text-zinc-600 text-sm">Debes agregar por lo menos una foto</span>}
            {error && <span className="text-red-500">Ocurrió un error inesperado, por favor, inténtelo más tarde</span>}
            {isLoading ?
                <p className="flex items-center justify-end">Procesando...</p>
                :
                <div className="flex flex-col md:flex-row gap-3 items-center justify-end">
                    <button disabled={!isFormValid} className="btn-primary font-bold px-1! py-1! rounded justify-center flex self-end w-full md:w-36" type="submit">
                        {formData.id ? 'Actualizar' : 'Guardar'}
                    </button>
                    {
                        formData.id &&
                        <button onClick={onDeleteSample} className="bg-red-500 font-bold p-1 rounded justify-center flex self-end text-white cursor-pointer hover:bg-red-600 w-full md:w-36" type="button">
                            Eliminar
                        </button>
                    }
                    <button onClick={restartForm} className="bg-amber-500 font-bold p-1 rounded justify-center flex self-end text-white cursor-pointer hover:bg-amber-600 w-full md:w-36" type="button">
                        Cancelar
                    </button>
                </div>
            }
        </form>
    )
}
