'use client'

import { useEffect, useState } from 'react'
import Giscus from '@giscus/react'
import { updateGiscusTheme } from '../lib/giscus-theme' // 👈 import hàm dùng chung

export default function GiscusComments() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const saved = localStorage.getItem('modeByThean')
    const initialTheme = saved === 'dark' ? '/styles/giscus-dark.css' : 'light'
    setTheme(initialTheme)
    updateGiscusTheme(initialTheme)

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'modeByThean') {
        const newTheme = e.newValue === 'dark' ? '/styles/giscus-dark.css' : 'light'
        setTheme(newTheme)
        updateGiscusTheme(newTheme)
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    if (theme) {
      updateGiscusTheme(theme)
    }
  }, [theme])

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
      theme={theme}
      lang="vi"
      loading="lazy"
    />
  )
}
