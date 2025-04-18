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
import rehypeKatex from 'rehype-katex'



const postsDir = path.join(process.cwd(), 'posts')

export interface PostData {
  slug: string
  title: string
  subtitle?: string
  author?: string
  date: string
  contentHtml: string
  image?: string | null
  tags?: string[]
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
      .use(remarkRehype, { allowDangerousHtml: true }) // 👈 cần có cái này nếu muốn xử lý HTML
      .use(rehypeRaw)                                  // 👈 cần thêm để "chấp nhận" HTML trong MD
      .use(rehypeKatex) // 💡 xử lý $...$
      .use(rehypeHighlight)
      .use(rehypeStringify, { allowDangerousHtml: true }) // 👈 để giữ HTML khi stringify
      .process(content)

    const contentHtml = processed.toString()

    // 🖼️ Trích ảnh đầu tiên (nếu có)
    const imgMatch = contentHtml.match(/<img[^>]+src="([^">]+)"/)
    const firstImage = imgMatch ? imgMatch[1] : "@/public/images/avt.png"

    return {
      slug,
      title: data.title ?? 'Untitled',
      subtitle: data.subtitle ?? '',
      author: data.author ?? '',
      date: data.date ?? '',
      contentHtml: contentHtml,
      image: firstImage,
      tags: data.tags ?? [],
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
