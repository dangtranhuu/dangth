import TutorialSidebar from '../tutorial/SideBar'
import { getTutorialTreeDeep } from '@/lib/tutorial'

export default async function TutorialLayout({
  children,
  activeSlug,
}: {
  children: React.ReactNode
  activeSlug: string
}) {
  const tree = getTutorialTreeDeep()

  return (
    <div className="flex justify-center px-4 md:px-8 lg:px-12 relative">
      {/* wrapper toàn layout, giới hạn max width để căn giữa */}
      <div className="flex w-full max-w-[1280px] min-h-screen">

        {/* khoảng trống để "chừa chỗ" cho sidebar fixed */}
        <div className="hidden lg:block w-[260px]" />

        {/* Sidebar fixed, không sát lề trái, mà căn theo layout */}
        <aside className="hidden lg:block fixed top-0 left-[max(1rem,calc(50%-640px))] h-screen w-[260px] rounded-[10px] mt-[30px] border-r border-gray-200 dark:border-gray-800 overflow-y-auto px-6 py-8 bg-white dark:bg-[var(--background-color-dark)]">
          <TutorialSidebar activeSlug={activeSlug} tree={tree} />
        </aside>

        {/* Nội dung cuộn */}
        <main className="flex-1 px-6 py-10 max-w-4xl mx-auto">
          {children}
        </main>
      </div>
    </div >
  )
}
