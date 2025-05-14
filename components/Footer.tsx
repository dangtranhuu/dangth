// components/Footer.tsx
import React from 'react';
export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Dangth.dev. Powered by UI by <a href="https://dangth.dev" className="underline hover:text-primary">Davis</a>.
        </p>
        <p>
          Built with <a href="https://nextjs.org" className="underline hover:text-primary">Next.js</a> &nbsp;|&nbsp;
          UI by <a href="https://ui.shadcn.dev" className="underline hover:text-primary">ShadCN</a>
        </p>
      </div>
    </footer>
  );
}