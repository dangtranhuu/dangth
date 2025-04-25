'use client'

import { useEffect, useState } from 'react'
import Giscus from '@giscus/react'

export default function GiscusComments() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Lấy theme ban đầu từ localStorage (nếu có)
    const stored = localStorage.getItem('modeByThean')
    const initialTheme = stored === 'dark' ? '/styles/giscus-dark.css' : 'light'
    setTheme(initialTheme)

    // Nghe sự kiện 'theme-changed' từ Navbar
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent
      const newTheme = customEvent.detail === 'dark' ? '/styles/giscus-dark.css' : 'light'
      setTheme(newTheme)
    }

    window.addEventListener('theme-changed', handleThemeChange)
    return () => window.removeEventListener('theme-changed', handleThemeChange)
  }, [])

  return (
    <Giscus
      key={theme}
      id="comments"
      repo="dangth12/blog-giscus-comments"
      repoId="R_kgDOJpeyjQ"
      category="Announcements"
      categoryId="DIC_kwDOJpeyjc4CW2KO"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme}
      lang="vi"
      loading="lazy"
    />
  )
}
