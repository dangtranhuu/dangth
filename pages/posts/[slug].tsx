import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPostData, PostData } from '../../lib/markdown'

interface PostPageProps {
  postData: PostData
}

export default function Post({ postData }: PostPageProps) {
  return (
    <article>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Giả sử chỉ có 1 file markdown: hello-world.md
  return {
    paths: [{ params: { slug: 'hello-world' } }],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const postData = await getPostData(slug)

  return {
    props: {
      postData,
    }
  }
}
