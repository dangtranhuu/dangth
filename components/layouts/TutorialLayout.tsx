import TutorialSidebar from '../tutorial/SideBar'
import { getTutorialTreeDeep } from '@/lib/tutorial'

export default async function TutorialLayout({
  children,
  activeSlug,
}: {
  children: React.ReactNode
  activeSlug: string
}) {
  const tree = getTutorialTreeDeep() // ✅ Lấy luôn trên server

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:block w-[260px] p-6 border-r border-gray-200 dark:border-gray-800">
        <TutorialSidebar activeSlug={activeSlug} tree={tree} />
      </aside>
      <main className="flex-1 px-6 py-10 max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  )
}
