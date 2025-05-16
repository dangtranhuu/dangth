// app/tutorials/page.tsx
import TutorialLayout from '@/components/layouts/TutorialLayout'

export default function TutorialsHomePage() {
  return (
    <TutorialLayout activeSlug="">
      <h1 className="text-3xl font-bold mb-4">📘 Giới thiệu</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Đây là nơi bạn có thể học các kiến thức theo cấu trúc giống GitBook. Hãy chọn một mục ở thanh bên trái để bắt đầu.
      </p>
    </TutorialLayout>
  )
}
