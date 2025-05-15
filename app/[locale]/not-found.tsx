import React from "react"
import Kaomoji from '@/components/Kaomoji';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <div className="text-center max-w-xl">
        <Kaomoji />
        <h1 className="text-3xl font-semibold mb-4 mt-[80px]">Lạc trôi đâu đếyyy ???</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Đừng mò nữa, ở đây không có gì ngoài sự trống vắng…
        </p>
      </div>
    </div>
  );
}
