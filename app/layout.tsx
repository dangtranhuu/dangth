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

export const metadata = {
  metadataBase: new URL('https://dangth.dev'),
  title: 'Tran Huu Dang',
  description: 'Personal portfolio of Tran Huu Dang',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (

    <html className={cmuSansVi.variable}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className='dark:bg-[var(--background-color-dark)] min-h-screen flex flex-col'>
        <ImageZoomClient />
        <Navbar />
        <main className='dark:bg-[var(--background-color-dark)]'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
