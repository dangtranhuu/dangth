// app/tutorials/[...slug]/page.tsx
import { getTutorial, getAllTutorialSlugs } from '@/lib/tutorial'
import TutorialLayout from '@/components/layouts/TutorialLayout'
import { notFound } from 'next/navigation'
import { flattenSidebar, findNavContext } from '@/lib/tutorialNav'
import { tutorialSidebar } from '@/config/tutorial.config'

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

      <div dangerouslySetInnerHTML={{ __html: tutorial.contentHtml }} />

      {/* Navigation */}
      <div className="mt-10 flex justify-between text-sm text-blue-600 dark:text-blue-400">
        {navContext?.previous && (
          <a href={navContext.previous.link}>&larr; {navContext.previous.text}</a>
        )}
        <div className="flex-1" />
        {navContext?.next && (
          <a href={navContext.next.link}>{navContext.next.text} &rarr;</a>
        )}
      </div>
    </TutorialLayout>
  )
}

export async function generateStaticParams() {
  return getAllTutorialSlugs()
}
