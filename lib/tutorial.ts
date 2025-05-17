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
import remarkAdmonition from './plugins/remarkAdmonition'
import 'katex/dist/katex.min.css'


export interface TutorialData {
  slug: string
  title: string
  subtitle?: string
  contentHtml: string
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

  return {
    slug,
    title: data.title ?? '',
    subtitle: data.subtitle ?? '',
    contentHtml: processed.toString()
  }
}