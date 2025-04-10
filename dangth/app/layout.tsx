// app/layout.tsx
import '../styles/global.css'
import '../styles/animation.css'
import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Tran Huu Dang',
  description: 'Personal portfolio of Tran Huu Dang',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Font từ Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap"
          rel="stylesheet"
        />

        {/* Font Computer Modern */}
        <link
          rel="stylesheet"
          href="https://cdn.rawgit.com/dreampulse/computer-modern-web-font/master/fonts.css"
        />

        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />

        <script src="../public/assets/js/main.js"></script>
        <script src="../public/assets/js/mode.js"></script>
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
