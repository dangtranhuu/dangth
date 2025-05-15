import React from "react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 81px)' }}>
      <div className="text-center max-w-xl">
        <h1 className="text-3xl font-semibold mb-4">404 - Đường dẫn không tồn tại</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Rất tiếc, không tìm thấy trang bạn đang tìm kiếm.
        </p>
      </div>
    </div>
  );
}
