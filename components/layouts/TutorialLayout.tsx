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
    <div className="flex justify-center px-4 md:px-8 lg:px-12">
      <div className="flex w-full max-w-[1280px] min-h-screen">
        {/* Sidebar cố định */}
        <aside className="hidden lg:block w-[260px] border-r border-gray-200 dark:border-gray-800">
          <div className="sticky top-0 h-screen overflow-y-auto p-6">
            <TutorialSidebar activeSlug={activeSlug} tree={tree} />
          </div>
        </aside>

        {/* Nội dung cuộn */}
        <main className="flex-1 px-6 py-10 max-w-4xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
