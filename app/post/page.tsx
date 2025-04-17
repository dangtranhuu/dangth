import React from 'react'
import styles from "./postList.module.css"
import { getAllPostsMeta } from '@/lib/markdown'


export default async function PostList() {

  const posts = await getAllPostsMeta() // Lấy tất cả metadata của bài viết

  return (
    <div className='container'>

      <h1>Post</h1>

      <div className={styles.publicationList}>
        {posts.map((post) => (
          <div key={post.slug} className={styles.publication}>
            <img src={post.image} alt={post.title} className={styles.thumbnail} />

            <div className={styles.pubContent}>
              <a href={`/post/${post.slug}`} className={styles.pubTitle}>
                {post.title}
              </a>
              <div className={styles.pubAuthors}>{post.authors.join(', ')}</div>
              {post.tags?.includes('Preprint') && (
                <div className={styles.pubNote}>Preprint</div>
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
