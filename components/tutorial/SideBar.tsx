'use client'

import Link from 'next/link'
import { TutorialNode } from '@/lib/tutorial'
import { SidebarIcon } from './SidebarIcon'
import { useEffect, useState } from 'react'

interface Props {
  activeSlug: string
  tree: TutorialNode[]
}

export default function TutorialSidebar({ activeSlug, tree }: Props) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setOpenMap(prev => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    const openKeys = findOpenKeysForSlug(tree, activeSlug) ?? []
    const initialMap = Object.fromEntries(openKeys.map((key) => [key, true]))
    setOpenMap(initialMap)
  }, [activeSlug, tree])

  const renderItems = (items: TutorialNode[], level = 0) => (
    <ul className={`space-y-1 ${level > 1 ? 'ml-[0.5rem] mt-[0.5rem] pl-3 border-l border-gray-500 dark:border-gray-900' : ''}`}>
      {items.map((item, idx) => {
        const key = `${item.title}-${idx}`
        const isOpen = openMap[key]
        const hasChildren = !!item.children?.length
        const isCollapsible = hasChildren

        if (isCollapsible) {
          return (
            <li key={key}>
              <div
                onClick={() => toggle(key)}
                className="cursor-pointer flex justify-between items-center text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mt-4 hover:text-black dark:hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <SidebarIcon icon={item.icon} />
                  {item.title}
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
                {item.title}
              </div>
              {renderItems(item.children!, level + 1)}
            </li>
          )
        }

        return (
          <li key={key}>
            <Link
              href={item.slug ? `/tutorial/${item.slug}` : '#'}
              className={`flex items-center gap-2 text-sm px-2 py-1 rounded transition-all ${activeSlug === item.slug
                ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900'
                : 'text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white'
                }`}
            >
              <SidebarIcon icon={item.icon} />
              {item.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return <nav className="p-4">{renderItems(tree)}</nav>
}

function findOpenKeysForSlug(
  items: TutorialNode[],
  targetSlug: string,
  path: string[] = []
): string[] | null {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const key = `${item.title}-${i}`

    if (item.slug === targetSlug) {
      return path
    }

    if (item.children) {
      const result = findOpenKeysForSlug(item.children, targetSlug, [...path, key])
      if (result) return result
    }
  }

  return null
}
