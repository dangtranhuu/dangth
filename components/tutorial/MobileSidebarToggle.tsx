import { useSidebarStore } from './sidebarStore'

export function MobileSidebarToggle() {
  const { isOpen, toggle } = useSidebarStore()

  return (
    <button
      className="block lg:hidden mb-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded"
      onClick={toggle}
    >
      {isOpen ? 'Đóng menu' : '☰ Mở menu'}
    </button>
  )
}
