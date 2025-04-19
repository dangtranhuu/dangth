// app/layout.tsx
import '../styles/global.css'
import '../styles/animation.css'
import 'highlight.js/styles/github.css' // hoặc: vs2015.css, atom-one-dark.css...
import '../styles/markdown.css'
import 'katex/dist/katex.min.css'

import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Live2DWidget from '@/components/Live2DWidget'

export const metadata = {
  title: 'Tran Huu Dang',
  description: 'Personal portfolio of Tran Huu Dang',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Font Computer Modern */}
        <link
          rel="stylesheet"
          href="https://cdn.rawgit.com/dreampulse/computer-modern-web-font/master/fonts.css"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Live2DWidget />
      </body>
    </html>
  )
}
