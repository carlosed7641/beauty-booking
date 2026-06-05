import { LoginForm } from '@/components'
import { Suspense } from 'react'

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginForm isAdmin />
        </Suspense>
    )
}