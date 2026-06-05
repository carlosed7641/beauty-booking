import { NewAccountForm } from './ui/NewAccountForm'

export default async function NewAccountnPage({
  searchParams
}: {
  searchParams: Promise<{ redirectTo?: string }>
}) {
    
    const params = await searchParams

    return (
        <NewAccountForm redirectTo={params.redirectTo} />
    )
}