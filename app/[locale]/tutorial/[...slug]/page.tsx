import { getTutorial, getAllTutorialSlugs } from '@/lib/tutorial'
import TutorialLayout from '@/components/layouts/TutorialLayout'
import { notFound } from 'next/navigation'
import GiscusComments from '@/components/GiscusComments'
import { flattenSidebar, findNavContext } from '@/lib/tutorial'
import { tutorialSidebar } from '@/config/tutorial.config'
import { SITE_CONFIG } from '@/config/config'
import { MdHistory, MdRebaseEdit } from "react-icons/md"
import { IoTimerOutline } from "react-icons/io5"

interface Params {
  params: { slug: string[] }
}

export default async function TutorialPage({ params }: Params) {
  const slug = params.slug.join('/')
  const tutorial = await getTutorial(slug)

  const flatItems = flattenSidebar(tutorialSidebar)
  const navContext = findNavContext(flatItems, slug)

  if (!tutorial) return notFound()

  return (
    <TutorialLayout activeSlug={slug}>
      {/* Breadcrumb */}
      {navContext?.current?.path && (
        <nav className="text-sm text-gray-500 mb-6">
          {['Tutorials', ...navContext.current.path].map((segment, idx, arr) => (
            <span key={idx}>
              {segment}
              {idx < arr.length - 1 && ' / '}
            </span>
          ))}
        </nav>
      )}

      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold mb-4">{tutorial.title}</h1>

      {/* Subtitle */}
      {tutorial.subtitle && (
        <p className="text-gray-500 dark:text-gray-300 mb-4">
          {tutorial.subtitle}
        </p>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-4 text-[18px] text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <IoTimerOutline />
          <span>{tutorial.readingTime} phút đọc</span>
        </div>
      </div>

      <div
        className="prose lg:prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: tutorial.contentHtml }}
      />

      {/* Edit & Update Info */}
      <div className="mt-10 flex flex-wrap justify-between items-center text-[18px] text-gray-500 dark:text-gray-400 border-t pt-6 gap-4">
        <a
          href={`${SITE_CONFIG.githubRepo}/edit/${SITE_CONFIG.githubBranch}/${SITE_CONFIG.tutorialDir}/${tutorial.slug}.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-500 hover:underline"
        >
          <MdRebaseEdit />
          Chỉnh sửa trên GitHub
        </a>

        <div className="flex items-center gap-1">
          <MdHistory />
          <span>
            Cập nhật: {new Date(tutorial.lastUpdated ?? 'chưa rõ').toLocaleString()}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex justify-between text-[18px] text-blue-600 dark:text-blue-400">
        {navContext?.previous && (
          <a href={navContext.previous.link}>&larr; {navContext.previous.text}</a>
        )}
        <div className="flex-1" />
        {navContext?.next && (
          <a href={navContext.next.link}>{navContext.next.text} &rarr;</a>
        )}
      </div>

      {/* Giscus comment */}
      <GiscusComments />

    </TutorialLayout>
  )
}

export async function generateStaticParams() {
  return getAllTutorialSlugs()
}
