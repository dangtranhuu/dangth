import TutorialPageClient from './PageClient';
import { getTutorial } from '@/lib/content/tutorial';
import type { Metadata } from 'next';

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await props.params;    // <-- Quan trọng
  const slugStr = slug.join('/');

  const post = await getTutorial(slugStr);
  if (!post) return { title: 'Not found' };

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      type: 'article',
      images: post.image ? [post.image] : []
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.subtitle,
      images: post.image ? [post.image] : []
    }
  };
}


export default function Page() {
  return <TutorialPageClient />;
}
