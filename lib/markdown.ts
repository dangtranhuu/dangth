import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import { notFound } from 'next/navigation'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css' // nhớ import CSS này ở đâu đó trong project (vd. _app.tsx)
import { estimateReadingTime } from '@/utils/readingTime'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkAdmonition from './plugins/remarkAdmonition'

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
export async function getPost(slug: string): Promise<PostData> {
  const filePath = path.join(postsDir, `${slug}.md`)

  if (!fs.existsSync(filePath)) notFound()

  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { content, data } = matter(raw)
    // const contentHtml = (await remark().use(html).process(content)).toString()
    const processed = await remark()
      .use(remarkGfm)
      .use(remarkMath)                                 // 👈 xử lý cú pháp toán học
      .use(remarkAdmonition)                          // render blockquote [TIP, INFO, WARNING]
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeKatex)                                // 👈 render LaTeX bằng KaTeX
      .use(rehypeHighlight)
      .use(rehypeSlug) // 👈 Tạo id cho h1, h2, h3...
      .use(rehypeAutolinkHeadings, { behavior: 'wrap' }) // 👈 Link tự động vào heading
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)

    const contentHtml = processed.toString()
    const contentHtmlWithZoom = contentHtml.replace(/<img /g, '<img class="zoom-img" ')


    // 🖼️ Trích ảnh đầu tiên (nếu có)
    const imgMatch = contentHtml.match(/<img[^>]+src="([^">]+)"/)
    const firstImage = imgMatch ? imgMatch[1] : "@/public/images/avt.png"

    const contentText = content.replace(/[#_*>\-\n`]/g, '') // loại bỏ markdown đơn giản
    const readingTime = estimateReadingTime(contentText)

    const stat = fs.statSync(filePath)
    const lastUpdated = stat.mtime.toISOString() // hoặc format tùy ý


    return {
      slug,
      title: data.title ?? 'Untitled',
      subtitle: data.subtitle ?? '',
      author: data.author ?? '',
      date: data.date ?? '',
      contentHtml: contentHtmlWithZoom,
      image: firstImage,
      tags: data.tags ?? [],
      lastUpdated: lastUpdated,
      readingTime: readingTime
    }

  } catch (err) {
    console.error(`Error loading post "${slug}":`, err)
    notFound()
  }
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
        title: data.title ?? 'Untitled',
        subtitle: data.subtitle ?? '',
        author: data.author ?? '',
        date: typeof data.date === 'string' ? data.date : new Date(data.date).toISOString().slice(0, 10),
        image: data.image ?? null,
        tags: data.tags ?? [],
        arxiv: data.arxiv ?? null,
      }
    })
}
