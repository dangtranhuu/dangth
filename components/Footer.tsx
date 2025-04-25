import React from 'react';
export default function Footer() {
  return (
    <footer>
      © Davis 2023 · A Fullstack developer at @{' '}
      <a
        href="http://devlands.io.vn"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >
        Devlands
      </a>
    </footer>
  );
}
