// components/Live2DClient.tsx
'use client'; // BẮT BUỘC phải là Client Component

import dynamic from 'next/dynamic';

// Dynamic import cho widget
// Vì component này đã là Client Component, bạn có thể đặt ssr: false ở đây
const LazyLive2DWidget = dynamic(
  () => import('next-live2d').then((mod) => mod.Live2DWidget),
  {
    ssr: false,
    loading: () => null
  }
);

export default function Live2DClient() {
  return (
    // Render widget trong component client này
    <LazyLive2DWidget modelName="HK416-2-normal" />
  );
}