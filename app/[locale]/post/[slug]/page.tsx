import React from 'react'
import Link from 'next/link'
import { getPost, getAllPostSlugs, getAllPostsMeta } from '@/lib/markdown'
import { extractHeadings } from '@/utils/extractHeadings'
import GiscusComments from '@/components/GiscusComments'
import { SITE_CONFIG } from '@/config/config'
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
    <div className="post relative flex gap-6 mt-12 px-4 text-[var(--text-color)] dark:text-[var(--text-color-dark)] dark:bg-[var(--background-color-dark)]">

      {/* TOC fixed right */}
      {headings.length > 0 && (
        <aside className="hidden xl:block fixed top-[100px] right-8 min-w-[200px] max-h-[calc(100vh-120px)] overflow-y-auto text-sm text-gray-500 dark:text-gray-400">
          <strong className="block text-base text-gray-800 dark:text-gray-100 mb-4">Mục lục</strong>
          <ul className="space-y-1">
            {headings.map((heading, idx) => (
              <li
                key={idx}
                className={`toc-item level-${heading.level} list-none`}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-gray-600 hover:text-blue-500 no-underline dark:text-gray-300"
                >
                  {heading.text}
                </a>
              </li>
            ))}
            <li className="toc-item list-none level-2">
              <a href="#comments" className="hover:text-blue-500">Thảo luận</a>
            </li>
          </ul>
        </aside>
      )}

      {/* Main content */}
      <article className="prose lg:prose-lg dark:prose-invert max-w-4xl mx-auto w-full">
        {/* Tags */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full border border-[#414141] text-[#414141] bg-[#4141410] text-[12px] leading-6 px-[10px] py-0 dark:border-[#b1b1b1] dark:text-[#cfcfcf]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="mb-4 leading-[normal]">{post.title}</h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-[18px] text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <MdDateRange />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <IoTimerOutline />
            <span>{post.readingTime} phút đọc</span>
          </div>
        </div>


        {/* Markdown */}
        <div dangerouslySetInnerHTML={{ __html: contentWithLang }} className="mt-10" />

        {/* Edit & Update Info */}
        <div className="mt-10 flex flex-wrap justify-between items-center text-[18px] text-gray-500 dark:text-gray-400 border-t pt-6 gap-4">
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

        {/* Pagination */}
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
        <div className='mt-[100px]'>
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
