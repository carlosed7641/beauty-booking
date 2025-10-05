import { RiEmotionHappyLine, RiEmotionNormalLine, RiEmotionUnhappyLine } from 'react-icons/ri'

export const Emotion = ({ averagePoints, showLabel }: { averagePoints: number, showLabel?: boolean }) => (
    averagePoints >= 2.5 ?
        <div className="flex flex-col gap-1 items-center text-green-500">
            <RiEmotionHappyLine className="text-4xl" />
            {showLabel && <span className="text-xs">Llegó a tiempo</span>}
        </div>
        : averagePoints >= 1.5 ?
            <div className="flex flex-col gap-1 items-center text-yellow-500">
                <RiEmotionNormalLine className="text-4xl" />
                {showLabel && <span className="text-xs">Llegó tarde</span>}
            </div>
            :
            <div className="flex flex-col gap-1 items-center text-red-500">
                <RiEmotionUnhappyLine className="text-4xl" />
                {showLabel && <span className="text-xs">No llegó</span>}
            </div>
)
