import TutorialPageClient from './PageClient';
import { getTutorial } from '@/lib/content/tutorial';
import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: { slug: string[] } }
): Promise<Metadata> {
  const slugStr = params.slug.join('/');
  const post = await getTutorial(slugStr);
  if (!post) return { title: 'Not found' };

  return {
    title: post.title,
    openGraph: { title: post.title, type: 'article', images: post.image ? [post.image] : [] },
    twitter: { card: 'summary_large_image', title: post.title, images: post.image ? [post.image] : [] }
  };
}

export default function Page() {
  return <TutorialPageClient />;
}
