import { NextRequest, NextResponse } from 'next/server'
import { getMarkdownContent } from '@/lib/core/mdx'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const pathnameParts = url.pathname.split('/')
  // Giả định đường dẫn là /api/mdx/posts/your/post/slug
  const type = pathnameParts[3] // "posts" hoặc "tutorials"
  const slug = pathnameParts.slice(4) // ["your", "post", "slug"]

  if (type !== 'posts' && type !== 'tutorials') {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }

  const slugString = slug.join('/')
  const data = await getMarkdownContent(type as 'posts' | 'tutorials', slugString)

  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}
