'use client'

import { useState } from 'react'
import { TabsHeader } from './TabsHeader'
import type { Tab } from '@/interfaces/tab.interface'

export const Tabs = ({  tabs  }: {  tabs: Tab[] }) => {

  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeTabContent = tabs.find(t => t.id === activeTab)?.tab
  return (
    <div className="mt-4">
      <TabsHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="md:p-2">{activeTabContent}</div>
    </div>
  )
}