import { Tab } from '@/interfaces/tab.interface'
import clsx from 'clsx'

interface Props {
    tabs: Tab[]
    activeTab: string
    setActiveTab: (activeTab: string) => void
}

export const TabsHeader = ( { tabs, activeTab ,setActiveTab }: Props) => {

    return (
        <div role="tablist" className="flex border-b">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={
                        clsx(
                            "p-2 text-xs md:text-base cursor-pointer px-4 focus:outline-none",
                            {
                                "border-b-2 border-green-700 font-bold": activeTab === tab.id
                            }
                        )
                    }
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}
