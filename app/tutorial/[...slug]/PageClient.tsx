'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getMarkdownClient } from '@/lib/core/mdx-client'
import { MarkdownContent } from '@/lib/core/mdx'
import { SITE_CONFIG } from '@/config/config'
import { flattenSidebar, findNavContext } from '@/lib/content/tutorial-nav'
import { tutorialSidebar } from '@/config/tutorial.config'
import TutorialLayoutClient from '@/components/layouts/TutorialLayoutClient'
import GiscusComments from '@/components/github/GiscusComments'
import { MdHistory, MdRebaseEdit } from "react-icons/md"


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
        <div className='dark:text-[var(--text-color-dark)]'>
          {/* Breadcrumb + Title + Metadata */}
          <h1 className="text-3xl font-bold mb-4">{tutorial.title || ""}</h1>
          {tutorial.subtitle && (
            <p className="text-gray-500 dark:text-gray-300 mb-4">{tutorial.subtitle}</p>
          )}
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
              <Link href={navContext.previous.link || '#'}>&larr; {navContext.previous.text}</Link>
            )}
            <div className="flex-1" />
            {navContext?.next && (
              <Link href={navContext.next.link || '#'}>{navContext.next.text} &rarr;</Link>
            )}
          </div>

          <div className='mt-[5rem]' />
          <GiscusComments />
        </div>
      )}
    </TutorialLayoutClient>
  )
}

