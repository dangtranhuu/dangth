export const SITE_CONFIG = {
  url: 'dangth.dev',
  githubRepo: 'https://github.com/dangtranhuu/dangth',
  githubBranch: 'main', // Hoặc 'dev', 'next' tùy bạn
  postDir: 'posts',
}

export const GISCUS = {
  termPrefix: "dangth",
  id: "comments",
  repo: "dangth12/blog-giscus-comments" as `${string}/${string}`,
  repoId: "R_kgDOJpeyjQ",
  category: "Announcements",
  categoryId: "DIC_kwDOJpeyjc4CW2KO",
  mapping: 'pathname' as const,
  light: "light",
  dark: "transparent_dark"
}

export const GITHUB = {
  username: "dangtranhuu",
  topic: "featured"
}