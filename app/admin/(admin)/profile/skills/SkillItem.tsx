import { FiEdit, FiTrash } from 'react-icons/fi'

interface Props {
    skill: Skill
    onEdit: () => void
    onDelete: () => void
}

export const SkillItem = ({ skill, onEdit, onDelete }: Props) => {
    return (
        <>
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex justify-between">
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-300">
                    <div style={{ width: `${skill.percentage}%` }} className="bg-green-700 h-full rounded-full transition-all"></div>
                </div>
            </div>
            <div className="flex gap-2 items-center justify-end">
                <FiEdit onClick={onEdit} className="text-green-700 cursor-pointer" />
                <FiTrash onClick={onDelete} className="text-zinc-500 cursor-pointer" />
            </div>
        </>
    )
}
