import { CgSpinner } from 'react-icons/cg'
import { FiEdit, FiTrash } from 'react-icons/fi'

interface Props {
    skill: Skill
    isLoading: boolean
    isPending: boolean
    onEdit: () => void
    onDelete: () => void
}

export const SkillItem = ({ skill, isLoading, isPending, onEdit, onDelete }: Props) => {
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
                {
                    isLoading ?

                        <CgSpinner className="text-green-700 animate-spin text-2xl" />
                        :
                        <>
                            <button disabled={isPending}>
                                <FiEdit onClick={onEdit} className="text-green-700 cursor-pointer" />
                            </button>
                            <button disabled={isPending}>    
                                <FiTrash onClick={onDelete} className="text-zinc-500 cursor-pointer" />
                            </button>
                        </>
                }
            </div>
        </>
    )
}
