import { EventItem } from './EventItem'
interface Props {
    events: EventDate[]
}

export const EventList = ({ events }: Props) => {
    return (
        <ul className="flex flex-col gap-3">
            {events.map(event => (
                <EventItem
                    key={event.id}
                    event={event}
                />
            ))}
        </ul>
    )
}