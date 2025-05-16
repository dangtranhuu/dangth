// app/tutorials/[...slug]/page.tsx
import { getTutorial, getAllTutorialSlugs } from '@/lib/tutorial'
import TutorialLayout from '@/components/layouts/TutorialLayout'
import { notFound } from 'next/navigation'

interface Params {
  params: { slug: string[] }
}

export default async function TutorialPage({ params }: Params) {
  const slug = params.slug.join('/')
  const tutorial = await getTutorial(slug)
  if (!tutorial) return notFound()

  return (
    <TutorialLayout activeSlug={slug}>
      <h1 className="text-3xl font-bold mb-6">{tutorial.title}</h1>
      {tutorial.subtitle && (
        <p className="text-gray-500 dark:text-gray-300 mb-4">{tutorial.subtitle}</p>
      )}
      <div dangerouslySetInnerHTML={{ __html: tutorial.contentHtml }} />
    </TutorialLayout>
  )
}

export async function generateStaticParams() {
  return getAllTutorialSlugs()
}
