'use client'


import React, { useState } from 'react'
import styles from "./postList.module.css"
import { FaUserEdit } from "react-icons/fa"
import { MdDateRange } from "react-icons/md"
import { FaTags } from "react-icons/fa"

interface Post {
  slug: string
  title: string
  subtitle?: string
  author?: string
  date: string
  image?: string
  tags?: string[]
  arxiv?: string
}

export default function PostListClient({ posts }: { posts: Post[] }) {

  const [selectedTag, setSelectedTag] = useState<string>('')

  const tagCounts: Record<string, number> = {}
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  const allTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]) // [tag, count]

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags?.includes(selectedTag))
    : posts

  return (
    <div className='container'>
      <h1>Post</h1>

      <div className={styles.tagBar}>
        <button
          onClick={() => setSelectedTag('')}
          className={`${styles.tagFilterBtn} ${selectedTag === '' ? styles.activeTag : ''}`}
        >
          Show All <span>{posts.length}</span>
        </button>

        {allTags.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`${styles.tagFilterBtn} ${selectedTag === tag ? styles.activeTag : ''}`}
          >
            {tag} <span>{count}</span>
          </button>
        ))}
      </div>

      <div className={styles.publicationList}>
        {filteredPosts.map((post) => (
          <div key={post.slug} className={styles.publication}>
            <img src={post.image} alt={post.title} className={styles.thumbnail} />

            <div className={styles.pubContent}>
              <a href={`/post/${post.slug}`} className={styles.pubTitle}>
                {post.title}
              </a>
              <p className={styles.pubSubtitle}>{post.subtitle}</p>
              <div className={styles.pubAuthors}>
                <FaUserEdit /> {post.author} | <MdDateRange /> {new Date(post.date).toISOString().slice(0, 10)}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className={styles.tagContainer}>
                  <div className={styles.tagHeader}>
                    <FaTags /> Tags:
                  </div>
                  <div className={styles.tagList}>
                    {post.tags.map((tag: string) => (
                      <button
                        key={tag}
                        className={styles.tagButton}
                        onClick={() => console.log(`Filter by tag: ${tag}`)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {post.arxiv && (
                <a
                  href={post.arxiv}
                  className={styles.pubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  arXiv
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
