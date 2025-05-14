// components/Footer.tsx
import React from 'react';
export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} <a href="https://dangth.dev" className="underline hover:text-primary">Dangth.dev</a>
        </p>
        <p>
          Developer at <a href="https://devlands.io.vn" className="underline hover:text-primary">Devlands</a> &nbsp;|&nbsp; Made with ❤️ in Vietnam.
        </p>
      </div>
    </footer>

  );
}