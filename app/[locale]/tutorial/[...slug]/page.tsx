'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getMarkdownClient } from '@/lib/mdx-client'
import { MarkdownContent } from '@/lib/mdx'
import { flattenSidebar, findNavContext } from '@/lib/tutorial-nav'
import { tutorialSidebar } from '@/config/tutorial.config'
import TutorialLayoutClient from '@/components/layouts/TutorialLayoutClient'

export default function TutorialPageClient() {
  const { slug } = useParams() as { slug: string[] }
  const slugStr = slug.join('/')

  const [tutorial, setTutorial] = useState<MarkdownContent | null>(null)
  const [loading, setLoading] = useState(true)

  const flat = flattenSidebar(tutorialSidebar)
  const navContext = findNavContext(flat, slugStr)

  useEffect(() => {
    setLoading(true)
    getMarkdownClient('tutorials', slugStr).then((data) => {
      setTutorial(data)
      setLoading(false)
    })
  }, [slugStr])

  return (
    <TutorialLayoutClient
      activeSlug={slugStr}
      tree={tutorialSidebar}
      isContentLoading={loading}
    >
      {!tutorial || loading ? null : (
        <div>
          {/* Breadcrumb + Title + Metadata */}
          <h1 className="text-3xl font-bold mb-4">{tutorial.title || ""}</h1>
          {tutorial.subtitle && (
            <p className="text-gray-500 dark:text-gray-300 mb-4">{tutorial.subtitle}</p>
          )}
          <div
            className="prose lg:prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: tutorial.contentHtml }}
          />
        </div>
      )}
    </TutorialLayoutClient>
  )
}
