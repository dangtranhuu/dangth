'use client'

import { useEffect } from 'react'
import { enableImageZoom } from '@/utils/zoomImage'

export default function ImageZoomClient() {
  useEffect(() => {
    enableImageZoom()
  }, [])

  return null // Không render gì, chỉ chạy effect
}
