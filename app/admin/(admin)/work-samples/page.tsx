import { WorkSamples } from './WorkSamples'
import { workSamples as allWorkSamples } from '@/util/fake-data'

export default function WorkSamplesPage() {

    const workSamples = allWorkSamples.filter(ws => ws.entityId === '422')

    return (
        <WorkSamples
            workSamples={workSamples}
        />
    )
}