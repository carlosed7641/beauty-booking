import { Suspense } from 'react'
import { NewAccountForm } from './ui/NewAccountForm'

export default function NewAccountnPage() {
    return (
        <Suspense fallback={null}>
        <NewAccountForm />
        </Suspense>
    )
}