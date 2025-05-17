import { useSidebarStore } from './sidebarStore'
import TutorialSidebar from '../tutorial/SideBar'
import { TutorialConfigItem } from '@/config/tutorial.config'

interface MobileSidebarProps {
  activeSlug: string
  tree: TutorialConfigItem[]
}

export function MobileSidebar({ activeSlug, tree }: MobileSidebarProps) {
  const { isOpen, close } = useSidebarStore()

  if (!isOpen) return null

  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-[var(--background-color-dark)] px-6 py-8 overflow-y-auto">
      <button className="mb-4 text-sm text-gray-600 dark:text-gray-300" onClick={close}>
        Đóng ✕
      </button>
      <TutorialSidebar activeSlug={activeSlug} tree={tree} />
    </div>
  )
}
