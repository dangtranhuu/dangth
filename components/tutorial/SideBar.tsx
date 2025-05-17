'use client'

import Link from 'next/link'
import { tutorialSidebar, TutorialConfigItem } from '@/config/tutorial.config'
import { useEffect, useState } from 'react'

interface Props {
  activeSlug: string
}

export default function TutorialSidebar({ activeSlug }: Props) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setOpenMap(prev => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    const openKeys = findOpenKeysForSlug(tutorialSidebar, activeSlug) ?? []
    const initialMap = Object.fromEntries(openKeys.map((key) => [key, true]))
    setOpenMap(initialMap)
  }, [activeSlug])

  const renderItems = (items: TutorialConfigItem[], level = 0) => (
    <ul className={`space-y-1 ${level > 0 ? 'pl-3 border-l border-gray-200 dark:border-gray-700' : ''}`}>
      {items.map((item, idx) => {
        const key = `${item.text}-${idx}`
        const isOpen = openMap[key]
        const hasChildren = !!item.children?.length
        const isCollapsible = item.collapsible && hasChildren

        if (isCollapsible) {
          return (
            <li key={key}>
              <div
                onClick={() => toggle(key)}
                className="cursor-pointer flex justify-between items-center text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mt-4 hover:text-black dark:hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">📁</span>
                  {item.text}
                </div>
                <svg
                  className={`w-3 h-3 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              {isOpen && renderItems(item.children!, level + 1)}
            </li>
          )
        }

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

  return <nav className="p-4">{renderItems(tutorialSidebar)}</nav>
}

function findOpenKeysForSlug(
  items: TutorialConfigItem[],
  targetSlug: string,
  path: string[] = []
): string[] | null {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const key = `${item.text}-${i}`

    if (item.link === `/tutorial/${targetSlug}`) {
      return path
    }

    if (item.children) {
      const result = findOpenKeysForSlug(item.children, targetSlug, [...path, key])
      if (result) return result
    }
  }

  return null
}
