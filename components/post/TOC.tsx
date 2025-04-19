'use client'

import React from 'react'

export default function TOC({ headings }: { headings: { id: string, text: string, level: number }[] }) {
  return (
    <aside>
      <strong>On this page</strong>
      <ul>
        {headings.map((heading, index) => (
          <li key={index} >
            <a href={`#${heading.id}`} >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
