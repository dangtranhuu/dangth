'use client'

import Giscus from '@giscus/react'

export default function GiscusComments() {
  return (
    <Giscus
      id="comments"
      repo="dangth12/blog-giscus-comments"
      repoId="R_kgDOJpeyjQ"
      category="Announcements"
      categoryId="DIC_kwDOJpeyjc4CW2KO"
      // mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="light"
      lang="vi"
      loading="lazy"
      mapping="specific" term={"post/backend/jwt-springboot"}

    />
  )
}
