import { SetStateAction } from 'react'
import Image from 'next/image'
import { IoMdCloseCircle } from 'react-icons/io'
import { TbPhotoPlus } from 'react-icons/tb'
import { Field } from '@/components'
import { INITAL_FORM_DATA, SERVICES_LIST } from '@/util/const'

interface Props {
    formData: SampleForm
    setFormData: (value: SetStateAction<SampleForm>) => void
    setShowForm: (value: SetStateAction<boolean>) => void
}

export const WorkSamplesForm = ({ formData, setFormData, setShowForm }: Props) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        //TODO: Make logic of the images
        restartForm()
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        const files = Array.from(e.target.files).map((file, idx) => ({
            id: crypto.randomUUID(),
            mainImage: !formData.images.length && idx === 0,
            url: URL.createObjectURL(file),
        }))

        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }))
    }

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const restartForm = () => {
        setShowForm(false)
        setFormData(INITAL_FORM_DATA)
    }


    const onChangeMainImage = (id: string) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.map(image => ({
                ...image,
                mainImage: image.id === id
            }))
        }))
    }


    const onDeleteImage = (id: string) => {
        setFormData(prev => {
            const wasMainImage = prev.images.find(img => img.id === id)?.mainImage
            const filteredImages = prev.images.filter(img => img.id !== id)

            if (wasMainImage && filteredImages.length > 0) {
                filteredImages[0] = { ...filteredImages[0], mainImage: true }
            }

            return {
                ...prev,
                images: filteredImages
            }
        })
    }


    const onDeleteSample = () => {
        console.log(formData.id)
    }


    const isFormValid = formData.name && formData.category && formData.images.length > 0

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <span className="text-zinc-500 text-sm">{formData.id ? 'Editar' : 'Agregar'} Muestra de trabajo</span>
            <Field label="Nombre">
                <input name="name" onChange={handleFieldChange} value={formData.name} placeholder="Ej: Taper medio" className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
            </Field>
            <Field label="Tipo de servicio" hint="¿Qué tipo de servicio son las fotos de esta muestra de trabajo?">
                <select name="category" onChange={handleFieldChange} value={formData.category} className="border border-green-700 p-1 rounded-md focus:outline-0 mt-2">
                    <option value="" disabled>Seleciona una categoría</option>
                    {
                        Object.keys(SERVICES_LIST).map(category => <option key={category} value={category}>{category}</option>)
                    }
                </select>
            </Field>
            {formData.images.length > 0 && <span className="text-zinc-500 text-sm">Toca la imagen que quieres que sea la principal</span>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
                {
                    formData.images.map(image => (
                        <div onClick={() => onChangeMainImage(image.id)} className="relative cursor-pointer" key={image.id}>
                            <Image className="rounded-sm object-cover w-full h-full" height={150} width={150} alt={formData.name} src={image.url} />
                            {
                                image.mainImage && <span className="absolute top-3 block px-2 py-1 bg-green-700 text-white text-xs rounded-tr-full rounded-br-full">Principal</span>
                            }
                            <IoMdCloseCircle onClick={(e) => {
                                e.stopPropagation()
                                onDeleteImage(image.id)
                            }} className="absolute bottom-1 right-1 text-2xl fill-white" />
                        </div>
                    ))
                }
                <label className="cursor-pointer aspect-square h-full w-full">
                    <div className="flex h-full justify-center items-center bg-zinc-200 rounded-sm border border-zinc-600">
                        <TbPhotoPlus className="text-zinc-400 text-6xl" />
                    </div>
                    <input onChange={handleFileChange} className="hidden" type="file" multiple accept="image/png, image/jpeg, image/webp" />
                </label>
            </div>
            {!formData.images.length && <span className="text-zinc-600 text-sm">Debes agregar por lo menos una foto</span>}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-end">
                <button disabled={!isFormValid} className="bg-green-700 font-bold p-1 rounded justify-center flex self-end text-white cursor-pointer hover:bg-green-800 w-full md:w-36 disabled:opacity-60 disabled:pointer-events-none" type="submit">
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
        </form>
    )
}
