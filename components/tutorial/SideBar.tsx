'use client'

import { useState } from 'react'
import Link from 'next/link'
import { tutorialSidebar, TutorialConfigItem } from '@/config/tutorial.config'

interface Props {
  activeSlug: string
}

export default function TutorialSidebar({ activeSlug }: Props) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setOpenMap(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const renderItems = (items: TutorialConfigItem[], level = 0) => (
    <ul className={`space-y-1 ${level > 0 ? 'pl-4' : ''}`}>
      {items.map((item, idx) => {
        const key = `${item.text}-${idx}`
        const isOpen = openMap[key]
        const hasChildren = !!item.children?.length
        const isCollapsible = item.collapsible && hasChildren

        // ✅ Nếu là folder có thể mở/đóng
        if (isCollapsible) {
          return (
            <li key={key}>
              <div
                onClick={() => toggle(key)}
                className="cursor-pointer flex items-center gap-2 font-bold text-xs uppercase text-gray-600 dark:text-gray-300 mt-4"
              >
                <span>{isOpen ? '📂' : '📁'}</span>
                {item.text}
              </div>
              {isOpen && renderItems(item.children!, level + 1)}
            </li>
          )
        }

        // ✅ Nếu là nhóm tĩnh (không collapsible nhưng có con)
        if (hasChildren) {
          return (
            <li key={key}>
              <div className="mt-4 mb-1 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
                {item.text}
              </div>
              {renderItems(item.children!, level + 1)}
            </li>
          )
        }

        // ✅ Nếu là link thường
        return (
          <li key={key}>
            <Link
              href={item.link ?? '#'}
              className={`block text-sm px-2 py-1 rounded transition-all ${activeSlug === item.link?.replace('/tutorial/', '')
                  ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900'
                  : 'text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white'
                }`}
            >
              {item.text}
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav className="p-4">
      {renderItems(tutorialSidebar)}
    </nav>
  )
}
