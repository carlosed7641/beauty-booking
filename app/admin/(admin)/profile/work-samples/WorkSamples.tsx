'use client'

import { PiPlusCircleBold } from 'react-icons/pi'
import { Field, Modal, ModalHeader, WorkSamplesTab } from '@/components'
import { useModal } from '@/store'
import { workSamples as allWorkSamples } from '@/util/fake-data'
import { TbPhotoPlus, TbPhotoUp } from 'react-icons/tb'
import { IoMdAdd, IoMdCloseCircle } from 'react-icons/io'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { SERVICES_LIST } from '@/util/const'
import clsx from 'clsx'

const userId = 'abc'

const INITAL_FORM_DATA: Omit<WorkSample, 'author' | 'authorId' | 'entityId'> = {
    id: '',
    name: '',
    category: '',
    images: []
}

export const WorkSamples = () => {

    const { openModal, setOpenModal } = useModal()
    const [showForm, setShowForm] = useState(false)
    const workSamples = allWorkSamples.filter(ws => ws.authorId === userId)
    const [formData, setFormData] = useState(INITAL_FORM_DATA)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        // restartForm()
    }

    const handleClickSample = (sample: WorkSample) => {
        const { author, authorId, entityId, ...data } = sample
        setFormData(data)
        setShowForm(true)
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

            console.log(filteredImages)

            return {
                ...prev,
                images: filteredImages
            }
        })
    }

    const onDeleteSample = () => {
        console.log(formData.id)
    }

    useEffect(() => { restartForm() }, [openModal])

    const isFormValid = formData.name && formData.category

    return (
        <>
            <div className="bg-white w-full rounded-md p-7">
                <div className="flex justify-between md:justify-start md:gap-3 items-center mb-3 text-green-700">
                    <span className="text-xl md:text-2xl">Mi trabajo</span>
                    <PiPlusCircleBold onClick={() => setOpenModal(WorkSamples.name)} className="text-2xl cursor-pointer" />
                </div>
                <div className="flex flex-col gap-3">
                    {
                        workSamples.length > 0 ?
                            <WorkSamplesTab workSamples={workSamples} hideFilters hideName />
                            : <p>No hay nada acá aún</p>
                    }
                </div>
            </div>
            {
                openModal === WorkSamples.name &&
                <Modal>
                    <ModalHeader>
                        <div className="flex gap-2 items-center text-xl text-green-700">
                            <TbPhotoUp className="text-2xl" />
                            Muestras de trabajo
                        </div>
                    </ModalHeader>
                    {
                        showForm ?
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <span className="text-zinc-500 text-sm">{formData.id ? 'Editar' : 'Agregar'} Muestra de trabajo</span>
                                <Field label="Nombre">
                                    <input name="name" onChange={handleChange} value={formData.name} placeholder="Ej: Taper medio" className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
                                </Field>
                                <Field label="Tipo de servicio" hint="¿Qué tipo de servicio son las fotos de esta muestra de trabajo?">
                                    <select name="category" onChange={handleChange} value={formData.category} className="border border-green-700 p-1 rounded-md focus:outline-0 mt-2">
                                        <option value="" disabled>Categoría</option>
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
                                                <Image className="rounded-sm object-cover w-full" height={150} width={150} alt={formData.name} src={image.url} />
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
                                        <div className={
                                            clsx(
                                                "flex justify-center items-center bg-zinc-200 rounded-sm border border-zinc-600",
                                                {
                                                    "h-full": formData.images.length > 0,
                                                    "h-[150px] w-[150px]": !formData.images.length
                                                }
                                            )
                                        }>
                                            <TbPhotoPlus className="text-zinc-400 text-6xl" />
                                        </div>
                                        <input className="hidden" type="file" accept="image/png, image/jpeg, image/webp" />
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
                            :
                            <>
                                <span className="text-zinc-600 text-sm text-center flex">
                                    Acá puedes crear y ver tus muestras de trabajo. Potenciales clientes podrán apreciarlos y descubrir tu talento
                                </span>
                                <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 mt-4 gap-3">
                                    {
                                        workSamples.map(sample => {
                                            const mainImage = sample.images.find(image => image.mainImage) || sample.images[0]
                                            return (
                                                <li className="cursor-pointer" onClick={() => handleClickSample(sample)} key={sample.id}>
                                                    <Image className="rounded-sm object-cover w-full" src={mainImage.url} alt={sample.name} width={160} height={170} />
                                                    <span className="inline-block w-full mt-1 text-green-700 font-bold">{sample.name}</span>
                                                    <span>{sample.category}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <button onClick={() => setShowForm(true)} title="Agregar" className="fixed bottom-5 justify-self-end rounded-full bg-green-700 text-white h-10 w-10 flex items-center justify-center text-2xl cursor-pointer shadow-sm">
                                    <IoMdAdd />
                                </button>
                            </>
                    }

                </Modal>
            }
        </>
    )
}
