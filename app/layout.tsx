import './globals.css'
import '@/styles/global.css'
import '@/styles/animation.css'
import '@/styles/dark-mode.css'
import 'highlight.js/styles/github.css'
import '@/styles/markdown.css'
import 'katex/dist/katex.min.css'

import { ReactNode } from 'react'
import { cmuSansVi } from './fonts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ImageZoomClient from '@/components/ImageZoomClient'
import Live2DClient from '@/components/Live2DClient';


export const metadata = {
  metadataBase: new URL('https://dangth.dev'),
  title: {
    default: 'Trần Hữu Đang – Lập trình viên Fullstack',
    template: '%s | Trần Hữu Đang'
  },
  description:
    'Portfolio của Trần Hữu Đang – Lập trình viên Fullstack, kinh nghiệm Next.js, Spring Boot, DevOps, Microservices, và phát triển hệ thống web.',
  keywords: [
    'Trần Hữu Đang',
    'lập trình viên',
    'lập trình viên fullstack',
    'nextjs developer',
    'spring boot developer',
    'portfolio lập trình viên',
    'fullstack developer vietnam'
  ],
  openGraph: {
    title: 'Trần Hữu Đang – Fullstack Developer',
    description:
      'Xem portfolio của Trần Hữu Đang, bao gồm kinh nghiệm, dự án, chứng chỉ và kỹ năng.',
    url: 'https://dangth.dev',
    type: 'website',
    siteName: 'dangth.dev',
    locale: 'vi_VN',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trần Hữu Đang – Fullstack Developer',
    description: 'Portfolio lập trình viên fullstack.',
    images: ['/images/og-image.png'],
  },
  other: {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Trần Hữu Đăng',
      url: 'https://dangth.dev',
      jobTitle: 'Lập trình viên Fullstack',
      sameAs: [
        'https://github.com/dangtranhuu',
        'https://www.linkedin.com/in/tranhuudang',
        'https://www.facebook.com/dangth.dev',
        'https://www.youtube.com/@devlands'
      ],
    }),
  }
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (

    <html className={cmuSansVi.variable} lang="vi">
      <head>
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" /> */}
      </head>
      <body className='dark:bg-[var(--background-color-dark)] min-h-screen flex flex-col'>
        <ImageZoomClient />
        <Live2DClient />
        <Navbar />
        <main className='dark:bg-[var(--background-color-dark)]'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
