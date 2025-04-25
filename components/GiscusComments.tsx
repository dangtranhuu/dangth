'use client'

import Giscus from '@giscus/react'

export default function GiscusComments() {
  const initialTheme = typeof window !== 'undefined' && localStorage.getItem('modeByThean') === 'dark'
    ? '/styles/giscus-dark.css'
    : 'light'


  return (
    <Giscus
      id="comments"
      repo="dangth12/blog-giscus-comments"
      repoId="R_kgDOJpeyjQ"
      category="Announcements"
      categoryId="DIC_kwDOJpeyjc4CW2KO"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={initialTheme} // 🔥 chỉ dùng lúc render lần đầu
      lang="vi"
      loading="lazy"
    />
  )
}
