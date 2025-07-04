import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getMarkdownContent } from '../core/mdx'
import 'katex/dist/katex.min.css'

const postsDir = path.join(process.cwd(), 'content/posts')

export interface PostData {
  slug: string
  title: string
  subtitle?: string
  author?: string
  date: string
  contentHtml: string
  image?: string | null
  tags?: string[]
  readingTime?: number
  lastUpdated?: string
}


export interface PostMeta {
  slug: string
  title: string
  subtitle?: string
  author?: string
  date: string
  image?: string | null
  tags?: string[]
  arxiv?: string | null
  published: boolean
}


// Lấy tất cả slug từ thư mục posts
export function getAllPostSlugs(): { params: { slug: string } }[] {
  return fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      params: { slug: file.replace(/\.md$/, '') }
    }))
}

// Load nội dung bài viết từ slug
export function getPost(slug: string) {
  return getMarkdownContent('posts', slug)
}

export async function getAllPostsMeta() {
  const files = fs.readdirSync(postsDir)

  return files
    .filter((file) => file.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const fileContent = fs.readFileSync(path.join(postsDir, filename), 'utf-8')
      const { data } = matter(fileContent)

      return {
        slug,
        title: data.title ?? '',
        subtitle: data.subtitle ?? '',
        author: data.author ?? '',
        date: typeof data.date === 'string' ? data.date : new Date(data.date).toISOString().slice(0, 10),
        image: data.image ?? null,
        tags: data.tags ?? [],
        arxiv: data.arxiv ?? null,
        published: data.published ?? true
      }
    })
}
