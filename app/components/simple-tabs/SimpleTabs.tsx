import clsx from 'clsx'
import { IconType } from 'react-icons'

interface Props {
    tabs: {
        id: string
        label: string
        icon?: IconType
    }[]
    activeTab: string
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export const SimpleTabs = ({
    tabs,
    activeTab,
    setActiveTab
}: Props) => {
    return (
        <div className="flex overflow-scroll md:overflow-auto scroll-none md:flex-wrap md:justify-center gap-6">
            {
                tabs.map(({ id, icon: Icon, label }) => (
                    <div key={id} onClick={() => setActiveTab(id)} role="tab"
                        className={
                            clsx(
                                "px-10 border-b-4 cursor-pointer border-zinc-300 flex shrink-0 gap-2 items-center pb-2",
                                {
                                    "border-green-700! text-green-700": activeTab === id
                                }
                            )
                        }>
                        {Icon && <Icon />}
                        {label}
                    </div>
                ))
            }
        </div>
    )
}
