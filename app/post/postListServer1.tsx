import { getAllPostsMeta } from '@/lib/markdown'
import PostListClient from './postListClient'

export default async function PostListServer() {
  const posts = await getAllPostsMeta()

  return <PostListClient posts={posts} />
}
