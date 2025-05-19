# dangth.dev – Personal Portfolio

This is the source code for [dangth.dev](https://dangth.dev), the personal website of Dang Tran Huu, a full-stack developer. The site is built with modern technologies like Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✨ **Modern App Router (Next.js 14)** with file-based routing
- 🌍 **Internationalized content** using `next-intl` (`/[locale]/`)
- 📚 **Tutorial system with nested sidebar navigation**
- 🧠 **Markdown & MDX rendering** with support for:
  - Math (`KaTeX`)
  - Syntax Highlighting (`highlight.js`)
  - GitHub Flavored Markdown (`remark-gfm`)
- 💬 **Comment system** with Giscus (GitHub Discussions)
- 🌗 **Dark mode** support via `next-themes`
- ⚡ **SEO-optimized**, fast first load (static pages, shared JS chunks)
- 📸 **Medium-style image zoom** (custom enhancements via `cheerio`)
- 🧩 **Skeleton loader** for smoother UX during content transitions
- 📦 **Structured content architecture** for posts, projects, tutorials

## 🛠 Tech Stack

| Area                  | Tech Used                                   |
|-----------------------|---------------------------------------------|
| Framework             | [Next.js 14](https://nextjs.org)            |
| Styling               | [Tailwind CSS](https://tailwindcss.com)     |
| Language              | TypeScript                                  |
| Theming               | `next-themes`                               |
| Markdown Processing   | `remark`, `rehype`, `gray-matter`, `cheerio` |
| Math Support          | `remark-math`, `rehype-katex`               |
| Syntax Highlighting   | `rehype-highlight`, `highlight.js`          |
| Comments              | Giscus (`@giscus/react`)                    |
| State Management      | `zustand`                                   |
| Animation             | `framer-motion`                             |
| Deployment            | [Vercel](https://vercel.com)                |

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/dangtranhuu/dangth.git
cd dangth

# Install dependencies
npm install

# Start development server
npm run dev
