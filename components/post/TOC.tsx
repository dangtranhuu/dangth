'use client'

import React from 'react'

export default function TOC({ headings }: { headings: { id: string, text: string, level: number }[] }) {
  return (
    <aside>
      <strong>On this page</strong>
      <ul>
        {headings.map((heading, index) => (
          <li key={index} className={`text-sm leading-relaxed ${heading.level === 3 ? 'ml-4' : heading.level === 4 ? 'ml-8' : ''}`}
            style={{
              marginLeft: `${(heading.level - 2) * 16}px`, // 👈 Thụt theo cấp (h2 = 0, h3 = 16px, ...)
            }}>
            <a href={`#${heading.id}`} >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
