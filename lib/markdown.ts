import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostData {
  slug: string
  title: string
  date: string
  contentHtml: string
}

// Lấy danh sách file .md trong thư mục posts/
export function getAllPostSlugs(): { params: { slug: string } }[] {
  const filenames = fs.readdirSync(postsDirectory)
  return filenames
    .filter(file => file.endsWith('.md'))
    .map((filename) => ({
      params: {
        slug: filename.replace(/\.md$/, ''),
      },
    }))
}

// Lấy nội dung file Markdown theo slug
export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  }
}


import { notFound } from 'next/navigation'

export async function getPost(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.md`)

  // Check nếu file không tồn tại
  if (!fs.existsSync(filePath)) {
    notFound()
  }

  try {
    const file = fs.readFileSync(filePath, 'utf-8')
    const { content, data } = matter(file)
    const processed = await remark().use(html).process(content)

    return {
      title: data.title ?? 'Untitled',
      date: data.date ?? '',
      contentHtml: processed.toString(),
    }
  } catch (err) {
    console.error('Error reading post:', err)
    notFound()
  }
}

