import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import { notFound } from 'next/navigation'


const postsDir = path.join(process.cwd(), 'posts')

export interface PostData {
  slug: string
  title: string
  date: string
  contentHtml: string
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
      .use(remarkRehype)           // convert markdown → HTML AST
      .use(rehypeHighlight)        // 🪄 gán class `language-java`, highlight luôn
      .use(rehypeStringify)
      .process(content)

    return {
      slug,
      title: data.title ?? 'Untitled',
      date: data.date ?? '',
      contentHtml: processed.toString(),
    }
  } catch (err) {
    console.error(`Error loading post "${slug}":`, err)
    notFound()
  }
}

