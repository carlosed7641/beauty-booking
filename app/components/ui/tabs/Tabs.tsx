'use client'

import { useState } from 'react'
import { ServiceListTab, WorkSamplesTab, Professionals } from '.'
import { TabsHeader } from './TabsHeader'
import type { Tab } from '@/interfaces/tab.interface'

export const Tabs = ({ professionalId  }: { professionalId?: string }) => {

  const tabs: Tab[] = [
    {
      id: 'services-list',
      label: 'Lista de servicios',
      tab: <ServiceListTab professionalId={professionalId} /> 
    },
    {
      id: 'work-samples',
      label: 'Muestras de trabajo',
      tab: <WorkSamplesTab professionalId={professionalId} />  
    }
  ]

  if (!professionalId) {
    tabs.push({
      id: 'professionals',
      label: 'Profesionales',
      tab: <Professionals />
    })
  }


  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeTabContent = tabs.find(t => t.id === activeTab)?.tab
  return (
    <div className="mt-4">
      <TabsHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="md:p-2">{activeTabContent}</div>
    </div>
  )
}