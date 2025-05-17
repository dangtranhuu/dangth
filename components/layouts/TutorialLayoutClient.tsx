'use client'

import { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { GiEvilBook } from "react-icons/gi";
import TutorialSidebar from '../tutorial/SideBar'
import { TutorialNode } from '@/lib/tutorial'

export default function TutorialLayoutClient({
  children,
  activeSlug,
  tree,
}: {
  children: React.ReactNode
  activeSlug: string
  tree: TutorialNode[]
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex justify-center px-4 md:px-8 lg:px-12 relative">
      <div className="flex w-full max-w-[1280px] min-h-screen relative">
        <div className="hidden lg:block w-[260px]" />
        <aside className="hidden lg:block fixed top-0 left-[max(1rem,calc(50%-640px))] h-screen w-[260px] mt-[30px] rounded-[10px] border-r border-gray-200 dark:border-gray-800 overflow-y-auto px-6 py-8 bg-white dark:bg-[var(--background-color-dark)]">
          <TutorialSidebar activeSlug={activeSlug} tree={tree} />
        </aside>

        {/* Mobile Sidebar */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-[var(--background-color-dark)] overflow-y-auto pt-[60px]">
            <button
              className="fixed top-0 left-0 w-full px-4 py-3 bg-white dark:bg-gray-800 text-left border-b border-gray-200 dark:border-gray-700 shadow"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <p className="flex items-start gap-2 font-semibold text-2xl"><IoMdClose /> <GiEvilBook /> Tutorials</p>
            </button>
            <div className="px-6 py-4">
              <TutorialSidebar activeSlug={activeSlug} tree={tree} />
            </div>
          </div>
        )}


        <main className="flex-1 px-0 lg:px-[100px] py-10 mx-auto pt-20 lg:w-full w-full">

          {!isMobileSidebarOpen && (
            <button
              className="lg:hidden fixed top-0 left-0 w-full z-50 px-4 py-3 bg-white dark:bg-gray-800 text-left border-b border-gray-200 dark:border-gray-700 shadow"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <p className="flex items-start gap-2 font-semibold text-2xl"><GiHamburgerMenu /> <GiEvilBook /> Tutorials</p>
            </button>
          )}

          {children}
        </main>
      </div>
    </div>
  )
}
