import { RiEmotionHappyLine, RiEmotionNormalLine, RiEmotionUnhappyLine } from 'react-icons/ri'

export const Emotion = ({ averagePoints }: { averagePoints: number }) => (
    averagePoints >= 2.5 ? <RiEmotionHappyLine className="text-green-500 text-4xl" />
        : averagePoints >= 1.5 ? <RiEmotionNormalLine className="text-yellow-500 text-4xl" />
            : <RiEmotionUnhappyLine className="text-red-500 text-4xl" />
)
