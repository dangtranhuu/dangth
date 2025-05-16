import React from 'react'
import Link from 'next/link'
import { getPost, getAllPostSlugs, getAllPostsMeta } from '@/lib/markdown'
import { extractHeadings } from '@/utils/extractHeadings'
import GiscusComments from '@/components/GiscusComments'
import { SITE_CONFIG } from '@/lib/config'

import { MdDateRange, MdHistory, MdRebaseEdit } from "react-icons/md"
import { IoTimerOutline } from "react-icons/io5"

interface Props {
  params: { slug: string }
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug)
  const allPosts = await getAllPostsMeta()
  allPosts.sort((a, b) => a.slug.localeCompare(b.slug))
  const currentIndex = allPosts.findIndex(p => p.slug === params.slug)
  const previous = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  const contentWithLang = post.contentHtml.replace(
    /<pre><code class="[^"]*language-(\w+)"/g,
    `<pre data-lang="$1"><code class="hljs language-$1"`
  )

  const headings = extractHeadings(contentWithLang)

  return (
    <div className="relative flex gap-6 mt-12 px-4 dark:text-[var(--text-color-dark)]">
      {/* Table of Contents (TOC) */}
      <aside className="hidden xl:block fixed top-[100px] right-8 min-w-[200px] max-h-[calc(100vh-120px)] overflow-y-auto text-sm text-gray-500">
        <strong className="block text-base text-gray-800 mb-4">Mục lục</strong>
        <ul className="space-y-1">
          {headings.map((heading, idx) => (
            <li
              key={idx}
              className={`toc-item list-none ${heading.level === 2
                ? 'ml-0'
                : heading.level === 3
                  ? 'ml-4'
                  : 'ml-8'
                }`}
            >
              <a
                href={`#${heading.id}`}
                className="text-gray-600 hover:text-blue-500 no-underline"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main article */}
      <article className="prose lg:prose-lg dark:prose-invert max-w-4xl mx-auto w-full">

        {/* TAG */}
        {(post.tags && post.tags.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className='article-title'>{post.title}</h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <MdDateRange />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <IoTimerOutline />
            <span>{post.readingTime} phút đọc</span>
          </div>

        </div>

        {/* Markdown Content */}
        <div
          className="mt-[100px]"
          dangerouslySetInnerHTML={{ __html: contentWithLang }}
        />

        {/* Edit + Last Updated */}
        <div className="mt-10 flex flex-wrap justify-between items-center text-sm text-gray-500 border-t pt-6 gap-4">
          <a
            href={`${SITE_CONFIG.githubRepo}/edit/${SITE_CONFIG.githubBranch}/${SITE_CONFIG.postDir}/${post.slug}.md`}
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
              Cập nhật: {new Date(post.lastUpdated ?? post.date).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Navigation */}
        {(previous || next) && (
          <div className="mt-10 pt-6 border-t flex justify-between text-blue-500 text-sm">
            <div>
              {previous && (
                <Link href={`/post/${previous.slug}`} className="hover:underline">
                  ← {previous.title}
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link href={`/post/${next.slug}`} className="hover:underline">
                  {next.title} →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="mt-12">
          <GiscusComments />
        </div>
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map(({ params }) => ({ slug: params.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      type: 'article',
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      images: post.image ? [post.image] : [],
    }
  }
}
