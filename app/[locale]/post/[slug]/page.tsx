import React from 'react'
import Link from 'next/link'
import { getPost, getAllPostSlugs, getAllPostsMeta } from '@/lib/markdown'
import { extractHeadings } from '@/utils/extractHeadings'
import GiscusComments from '@/components/GiscusComments'
import TOC from '@/components/post/TOC'
import { SITE_CONFIG } from '@/lib/config'

import { MdDateRange } from "react-icons/md"
import { IoTimerOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { MdRebaseEdit } from "react-icons/md";

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
    <div className='post' >

      {/* TOC bên trái */}
      <TOC headings={headings} />

      <article className="markdown-body container prose "   >
        <h1>{post.title}</h1>
        <p style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MdDateRange />
            {post.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <IoTimerOutline />
            {post.readingTime} phút
          </span>
          {post.tags && post.tags.length > 0 && (
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#d0d0d0',
                    borderRadius: '0.5rem',
                    padding: '0.2rem 0.6rem',
                    fontSize: '0.85rem',
                    color: '#333',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </span>
          )}
        </p>


        <div dangerouslySetInnerHTML={{ __html: contentWithLang }} />
        <hr style={{ margin: '3rem 0' }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.9rem',
          color: '#888',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* a chỉnh sửa trên GitHub */}
          <a
            href={`${SITE_CONFIG.githubRepo}/edit/${SITE_CONFIG.githubBranch}/${SITE_CONFIG.postDir}/${post.slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#409eff', textDecoration: 'none' }}
          >
            <MdRebaseEdit /> Edit this page on GitHub
          </a>

          {/* Ngày cập nhật */}
          <span>
            <MdHistory /> Last updated: {new Date(post.lastUpdated ?? post.date).toLocaleString()}
          </span>
        </div>

        {(previous || next) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2rem',
              fontSize: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #e0e0e0'
            }}
          >
            <div>
              {previous && (
                <Link href={`/post/${previous.slug}`} style={{ textDecoration: 'none', color: '#409eff' }}>
                  ← {previous.title}
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link href={`/post/${next.slug}`} style={{ textDecoration: 'none', color: '#409eff' }}>
                  {next.title} →
                </Link>
              )}
            </div>
          </div>
        )}


        <div style={{ margin: '2rem 0' }}></div>

        <GiscusComments />
      </article>
    </div >
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

