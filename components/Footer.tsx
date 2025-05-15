import React from 'react';
import { SITE_CONFIG } from '@/lib/config';
import { FaCode, FaRss } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="pt-[20px] pb-[20px] text-[var(--text-color)] dark:text-[var(--text-color-dark)] dark:bg-[var(--background-color-dark)] border-t border-gray-200 dark:border-[#9a9a9a7c">
      <div className="max-w-[700px] mx-auto px-4 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between">
        <p>
          © Davis 2025 · Developer at <a href="https://devlands.io.vn" className="underline hover:text-primary">Devlands</a>
        </p>
        <p className="flex items-center gap-4">
          <a href={SITE_CONFIG.githubRepo} className="flex items-center gap-1 underline hover:text-primary">
            <FaCode /> <span>Code</span>
          </a>
          <a href="#" className="flex items-center gap-1 underline hover:text-primary">
            <FaRss /> <span>RSS</span>
          </a>
        </p>
      </div>
    </footer>


  );
}