'use client'

import TutorialLayout from '@/components/layouts/TutorialLayout'
import Link from 'next/link'
import GiscusComments from '@/components/GiscusComments'

export default function TutorialsHomePage() {
  return (
    <TutorialLayout activeSlug="">
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">

        <section>
          <h1>Tutorials — Tài liệu lập trình mở</h1>
          <p>
            Đây là nơi mình chia sẻ kiến thức lập trình một cách hệ thống, súc tích, dễ hiểu.
            Nội dung được trình bày theo phong cách documentation, tối ưu cho việc học và tra cứu.
          </p>
        </section>

        <section>
          <h2>🎯 Mục tiêu</h2>
          <ul>
            <li>Chia sẻ kiến thức lập trình miễn phí</li>
            <li>Trình bày dễ hiểu, dễ nhớ, dễ học lại</li>
            <li>Không dài dòng, không dông dài, không drama</li>
          </ul>
        </section>

        <section>
          <h2>⚙️ Tính năng</h2>
          <ul>
            <li>Dark Mode / Light Mode</li>
            <li>Sidebar theo chuyên đề</li>
            <li>Markdown thân thiện như VitePress</li>
            <li>Bình luận bằng GitHub (Giscus)</li>
          </ul>
        </section>

        <section>
          <h2>🚀 Công nghệ</h2>
          <p>
            Website được build với <code>Next.js</code> + <code>Tailwind CSS</code>, nội dung viết bằng <code>MDX</code> và component React.
          </p>
        </section>

        <section>
          <h2>👨‍💻 Về tác giả</h2>
          <p>
            Mình là <strong>Trần Hữu Đang</strong> — lập trình viên trẻ, thích làm đồ đẹp, thích chia sẻ và tôn trọng UX.
          </p>
          <ul>
            <li>📮 Email: <a href="mailto:dangtt135@gmail.com">dangtt135@gmail.com</a></li>
            <li>🌐 GitHub: <Link href="https://github.com/Theanishtar" target="_blank">Theanishtar</Link></li>
          </ul>
        </section>
        <div className='mt-[5rem]' />
        <GiscusComments />
      </div>
    </TutorialLayout>
  )
}
