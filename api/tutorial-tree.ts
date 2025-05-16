// pages/api/tutorial-tree.ts
import { getTutorialTreeDeep } from '@/lib/tutorial'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const tree = getTutorialTreeDeep()
  res.status(200).json(tree)
}
