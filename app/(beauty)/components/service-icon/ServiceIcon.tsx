import { SERVICE_ICONS } from '@/util/const'

export const ServiceIcon = ({ category, className }: { category: string, className?: string }) => {
    const Component = SERVICE_ICONS[category]
    return <Component className={className} />
}
