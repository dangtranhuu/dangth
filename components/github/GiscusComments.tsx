'use client'

import Giscus from '@giscus/react'
import { useParams, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { GISCUS } from '@/config/config'

export default function GiscusComments() {
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams()

  // Bỏ locale ('/en', '/vi') khỏi pathname
  const pathWithoutLocale = pathname.replace(/^\/(en|vi)/, '')

  // Normalize path: fallback thành '/' nếu rỗng
  const normalizedPath = pathWithoutLocale === '' ? '/' : pathWithoutLocale

  // term sẽ luôn là: dangth/... (ví dụ: dangth/post/a)
  const term = `${GISCUS.termPrefix}+${normalizedPath}`

  const lang = locale === 'en' ? 'en' : 'vi'

  const initialTheme =
    typeof window !== 'undefined' && localStorage.getItem('dark-mode') === 'dark'
      ? GISCUS.dark
      : GISCUS.light

  return (
    <Giscus
      id={GISCUS.id}
      repo={GISCUS.repo}
      repoId={GISCUS.repoId}
      category={GISCUS.category}
      categoryId={GISCUS.categoryId}
      mapping="specific"
      term={term}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={initialTheme}
      lang={lang}
      loading="lazy"
    />
  )
}
