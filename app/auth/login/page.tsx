import { LoginForm } from '@/components'

export default async function LoginPage({
    searchParams
}: {
    searchParams: Promise<{ redirectTo?: string }>
}) {
    const params = await searchParams
    return (
        <LoginForm
            redirectTo={params.redirectTo}
        />
    )
}