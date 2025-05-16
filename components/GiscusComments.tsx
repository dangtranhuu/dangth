'use client'

import Giscus from '@giscus/react'
import { GISCUS } from '@/lib/config';

export default function GiscusComments() {
  const initialTheme = typeof window !== 'undefined' && localStorage.getItem('dark-mode') === 'dark'
    ? GISCUS.dark
    : GISCUS.light


  return (
    <Giscus
      id={GISCUS.id}
      repo={GISCUS.repo}
      repoId={GISCUS.repoId}
      category={GISCUS.category}
      categoryId={GISCUS.categoryId}
      mapping={GISCUS.mapping}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={initialTheme} // 🔥 chỉ dùng lúc render lần đầu
      lang="vi"
      loading="lazy"
    />
  )
}
