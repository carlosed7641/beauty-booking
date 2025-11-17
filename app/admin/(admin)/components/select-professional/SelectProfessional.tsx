import Image from 'next/image'
import clsx from 'clsx'

interface Props {
    professionals: ProfessionalSettings[] | ProfessionalData[]
    selectedProfessional: ProfessionalSettings | ProfessionalData
    setSelectedProfessional: (selectedProfessional: ProfessionalSettings | ProfessionalData) => void
    allOption?: boolean
}

const defaultValue: ProfessionalData = {
    id: '',
    name: '',
    entityId: '',
    resume: '',
    reviews: {
        points: 0,
        count: 0
    }
}

export const SelectProfessional = ({
    professionals,
    selectedProfessional,
    setSelectedProfessional,
    allOption
}: Props) => {
    return (
        <div className="flex gap-3 justify-center mb-2">
            {
                allOption &&
                <div onClick={() => setSelectedProfessional(defaultValue)} className="flex flex-col items-center gap-1 cursor-pointer" >
                    <div className={
                        clsx(
                            {
                                "border-4 border-white rounded-full": selectedProfessional.id !== '',
                                "border-4 border-green-900 rounded-full": selectedProfessional.id === ''
                            }
                        )
                    }>
                        <div className="border border-white p-2 h-16 w-16 bg-green-700 text-white rounded-full flex items-center justify-center text-3xl">
                           T
                        </div>
                    </div>
                    <span className="text-sm">Todos</span>
                </div>
            }
            {professionals.map(professional => (
                <div key={professional.id} onClick={() => setSelectedProfessional(professional)} className="flex flex-col items-center gap-1 cursor-pointer" >
                    <div className={
                        clsx(
                            {
                                "border-4 border-white rounded-full": selectedProfessional.id !== professional.id,
                                "border-4 border-green-900 rounded-full": selectedProfessional.id === professional.id
                            }
                        )
                    }>
                        {
                            professional.photo ?
                                <Image src={professional.photo} alt={professional.name} width={64} height={64} className="object-cover border-white h-16 w-16 rounded-full" />
                                : <div className="border border-white p-2 h-16 w-16 bg-green-700 text-white rounded-full flex items-center justify-center text-3xl">
                                    {professional.name[0]}
                                </div>
                        }
                    </div>
                    <span className="text-sm">{professional.name}</span>
                </div>
            ))}
        </div>
    )
}
