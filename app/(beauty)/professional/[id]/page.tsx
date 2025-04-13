interface Props {
    params: {
        id: string
    }
}

export default function ProfessionalPage({ params }: Props) {

    const { id } = params
    return (
        <div>
            <h1>Professional {id}</h1>
        </div>
    )
}