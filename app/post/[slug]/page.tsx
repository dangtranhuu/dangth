import { getPost, getAllPostSlugs } from '../../../lib/markdown'
import GiscusComments from '@/components/GiscusComments'
import React from 'react'

interface Props {
  params: { slug: string }
}

export default async function PostPage({ params }: Props) {

  const post = await getPost(params.slug)
  // ✅ Gán data-lang cho <pre>
  const contentWithLang = post.contentHtml.replace(
    /<pre><code class="[^"]*language-(\w+)"/g,
    `<pre data-lang="$1"><code class="hljs language-$1"`
  )
  return (
    <article className="markdown-body container prose">
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentWithLang }} />

      <hr style={{ margin: '2rem 0' }} />
      <GiscusComments />
    </article>
  )
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map(({ params }) => ({ slug: params.slug }))
}
