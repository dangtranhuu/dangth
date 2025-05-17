import TutorialLayoutClient from './TutorialLayoutClient'
import { getTutorialTreeDeep } from '@/lib/tutorial'

export default async function TutorialLayout({
  children,
  activeSlug,
}: {
  children: React.ReactNode
  activeSlug: string
}) {
  const tree = getTutorialTreeDeep()

  return (
    <TutorialLayoutClient activeSlug={activeSlug} tree={tree}>
      {children}
    </TutorialLayoutClient>
  )
}
