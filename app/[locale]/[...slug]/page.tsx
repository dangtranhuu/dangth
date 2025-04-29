'use client';

import { notFound } from 'next/navigation';

export default function CatchAllPage() {
  notFound(); // 🚀 Bắn thẳng về not-found.tsx
}
