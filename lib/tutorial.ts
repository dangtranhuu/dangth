import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import { estimateReadingTime } from '@/utils/readingTime'
import remarkAdmonition from './plugins/remarkAdmonition'
import 'katex/dist/katex.min.css'


export interface TutorialData {
  slug: string
  title: string
  subtitle?: string
  contentHtml: string,
  readingTime: number,
  lastUpdated: string
}

import { TutorialConfigItem } from '../config/tutorial.config'

export interface TutorialNavItem {
  text: string
  link?: string
  path: string[] // breadcrumb
}


const tutorialsDir = path.join(process.cwd(), 'content/tutorials')

export function getAllTutorialSlugs(): { slug: string[] }[] {
  const slugs: { slug: string[] }[] = []

  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir)
    for (const entry of entries) {
      const fullPath = path.join(dir, entry)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (entry.endsWith('.md')) {
        const relativePath = path.relative(tutorialsDir, fullPath)
        const slugParts = relativePath.replace(/\.md$/, '').split(path.sep)
        slugs.push({ slug: slugParts })
      }
    }
  }

  walk(tutorialsDir)
  return slugs
}

export async function getTutorial(slug: string): Promise<TutorialData | null> {
  const fullPath = path.join(tutorialsDir, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { content, data } = matter(raw)

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkAdmonition)                          // render blockquote [TIP, INFO, WARNING]
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)


  const contentHtml = processed.toString()
  const contentHtmlWithZoom = contentHtml.replace(/<img /g, '<img class="zoom-img" ')


  // 🖼️ Trích ảnh đầu tiên (nếu có)
  const imgMatch = contentHtml.match(/<img[^>]+src="([^">]+)"/)
  const firstImage = imgMatch ? imgMatch[1] : "@/public/images/avt.png"

  const contentText = content.replace(/[#_*>\-\n`]/g, '') // loại bỏ markdown đơn giản
  const readingTime = estimateReadingTime(contentText)

  const stat = fs.statSync(fullPath)
  const lastUpdated = stat.mtime.toISOString() // hoặc format tùy ý

  return {
    slug,
    title: data.title ?? '',
    subtitle: data.subtitle ?? '',
    contentHtml: contentHtmlWithZoom,
    readingTime: readingTime,
    lastUpdated: lastUpdated
  }
}


export function flattenSidebar(
  items: TutorialConfigItem[],
  parentPath: string[] = []
): TutorialNavItem[] {
  let result: TutorialNavItem[] = []

  for (const item of items) {
    const currentPath = [...parentPath, item.text]

    if (item.link) {
      result.push({ text: item.text, link: item.link, path: currentPath })
    }

    if (item.children) {
      result = result.concat(flattenSidebar(item.children, currentPath))
    }
  }

  return result
}

export function findNavContext(
  flat: TutorialNavItem[],
  currentSlug: string
) {
  const index = flat.findIndex((item) =>
    item.link === `/tutorial/${currentSlug}`
  )

  if (index === -1) return null

  return {
    current: flat[index],
    previous: flat[index - 1] ?? null,
    next: flat[index + 1] ?? null,
  }
}
