import { auth } from '@/auth.config'
import { WorkSamples } from './WorkSamples'
import { getUserById } from '@/actions'

export default async function WorkSamplesPage() {

    const session = await auth()
    const userData = await getUserById(session?.user?.id ?? '')

    return (
        <WorkSamples
            workSamples={userData?.samples ?? []}
            entityId={userData?.entityId ?? ''}
            authorId={userData?.id ?? ''}
        />
    )
}