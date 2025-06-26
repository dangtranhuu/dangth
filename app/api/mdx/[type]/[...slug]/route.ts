import { NextResponse } from 'next/server'
import { getMarkdownContent } from '@/lib/core/mdx'

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { type: string; slug: string[] }
  }
) {
  const { type, slug } = params

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
