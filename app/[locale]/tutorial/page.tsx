'use client'

import TutorialLayout from '@/components/layouts/TutorialLayout'
import Image from 'next/image'
import Link from 'next/link'

export default function TutorialsHomePage() {
  return (
    <TutorialLayout activeSlug="">
      <div className="prose prose-lg dark:prose-invert max-w-none">

        {/* ------------------- GIỚI THIỆU DỰ ÁN ------------------- */}
        <h1>Giới thiệu</h1>

        <p>
          <strong>Tutorials</strong> tại blog này là một dự án phi lợi nhuận được xây dựng với mục tiêu chia sẻ kiến thức lập trình hữu ích cho cộng đồng coder tại Việt Nam.
          Nội dung được cập nhật liên tục theo xu hướng công nghệ thực tế.
        </p>

        <h2>🎯 Mục tiêu ra đời</h2>
        <p>
          Khi còn là sinh viên năm nhất, mình thấy nhiều bạn gặp khó khăn khi học các môn chuyên ngành.
          Từ một nhóm học hỗ trợ nhau, mình quyết định phát triển một nền tảng học tập chia sẻ kiến thức theo hướng mở.
        </p>

        <h3>Ý tưởng từ cộng đồng</h3>
        <p>
          Lấy cảm hứng từ dự án của anh{' '}
          <Link href="https://github.com/zenfection1412" target="_blank">Lê Tuấn Kiệt</Link> (Đại học Cần Thơ) và website học lập trình F8 của anh Sơn Đặng,
          mình quyết tâm tạo một môi trường học tập phù hợp, đơn giản, dễ chia sẻ với các bạn sinh viên khác.
        </p>

        <h2>⚙️ Tính năng chính</h2>
        <ul>
          <li>🌓 Chế độ Dark mode / Light mode</li>
          <li>💬 Hệ thống bình luận dưới mỗi bài học</li>
        </ul>

        <h2>🛠️ Công nghệ sử dụng</h2>
        <p>
          Giao diện hiện tại được xây dựng bằng <strong>VueJS</strong> và theme <strong>Gungnir</strong>.
        </p>

        <h2>🚀 Định hướng phát triển</h2>
        <p>
          Mình sẽ cập nhật nội dung thường xuyên, cải thiện trải nghiệm người dùng, đặc biệt là tối ưu hiển thị trên thiết bị di động.
        </p>

        <hr />

        {/* ------------------- GIỚI THIỆU CÁ NHÂN ------------------- */}
        <h1>Đôi nét về mình</h1>

        <p>
          Mình là <strong>Trần Hữu Đang</strong> — một lập trình viên trẻ đang theo đuổi phát triển phần mềm và machine learning.
        </p>

        <h2>📚 Hành trình học tập</h2>
        <p>
          Mình từng là học sinh giỏi Tin học cấp thành phố (Pascal), nằm trong đội tuyển trường cấp ba suốt 3 năm.
          Từ sở thích với lập trình, mình chuyển thành đam mê và quyết định theo ngành IT.
        </p>

        <h2>🥇 Một số dự án tiêu biểu</h2>

        <h3>🎓 DESTINY — Dự án tốt nghiệp</h3>
        <Image src="/images/education/datn.png" alt="DESTINY" width={800} height={400} />
        <ul>
          <li>DESTINY là mạng xã hội đơn giản (web + mobile), đạt 9.8/10.</li>
          <li>Phát triển trong thời gian ngắn cùng các thành viên nhóm.</li>
          <li>
            🔗 <Link href="https://caodang.fpt.edu.vn/tin-tuc-poly/can-tho-tin-sinh-vien/nam-sinh-fpt-polytechnic-can-tho-tai-nang-sang-tao-he-thong-hoc-lap-trinh-bo-ich.html" target="_blank">Xem bài viết</Link>
          </li>
        </ul>

        <h3>🧩 Frog Quiz — Front-end Framework</h3>
        <Image src="/images/education/front-end-framework.png" alt="Frog Quiz" width={800} height={400} />
        <ul>
          <li>Dự án trắc nghiệm online học phần AngularJS</li>
          <li>Firebase, bình luận bằng GitHub, hỗ trợ realtime</li>
        </ul>

        <h3>☕ Java 5 — Mạng xã hội đồ 2hand</h3>
        <Image src="/images/education/java5.png" alt="Java 5" width={800} height={400} />
        <ul>
          <li>Spring MVC + JSP + Socket.io cho nhắn tin realtime</li>
          <li>Giảng viên đánh giá rất cao</li>
          <li>
            🔗 <Link href="https://caodang.fpt.edu.vn/tin-tuc-poly/can-tho-tin-sinh-vien/dien-dan-truc-tuyen-tang-do-secondhand-tien-loi-made-by-sinh-vien-fpt-polytechnic-can-tho.html" target="_blank">Xem bài viết</Link>
          </li>
        </ul>

        <h3>🛍️ Dự án 1 — App bán hàng Java Swing</h3>
        <Image src="/images/education/du-an-1.png" alt="Dự án 1" width={800} height={400} />
        <ul>
          <li>Ứng dụng quản lý bán hàng (desktop) với Java Swing</li>
          <li>Quét QR, webcam, tích hợp Excel</li>
          <li>
            🔗 <Link href="https://caodang.fpt.edu.vn/tin-tuc-poly/can-tho-tin-sinh-vien/du-an-phan-mem-quan-ly-ban-phu-kien-thiet-bi-di-dong-cua-sinh-vien-fpoly-can-tho-lot-mat-xanh-cua-giang-vien.html" target="_blank">Xem bài viết</Link>
          </li>
        </ul>

        <h2>🔮 Định hướng cá nhân</h2>
        <p>
          Hiện tại mình đang phát triển với Java Spring Boot, Angular và NodeJS. Trong tương lai, mình dự định theo hướng nghiên cứu chuyên sâu về Machine Learning.
        </p>

        <h2>📬 Kết nối với mình</h2>
        <ul>
          <li>🌐 GitHub: <Link href="#">Theanishtar</Link></li>
          <li>💼 LinkedIn: <Link href="#">Trần Hữu Đang</Link></li>
          <li>✉️ Email: <a href="mailto:dangtt135@gmail.com">dangtt135@gmail.com</a></li>
        </ul>
      </div>
    </TutorialLayout>
  )
}
