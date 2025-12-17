"use client";

import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { GITHUB } from '@/config/config';

export default function GithubContributions() {
  const [mounted, setMounted] = useState(false);

  // Đảm bảo component chỉ render tooltip sau khi đã mount vào trình duyệt
  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = {
    dark: ['#374151', '#1e4429', '#2d6d32', '#3fa641', '#53d353'],
    light: ['#F0F0F0', '#b9e6c1', '#81cd95', '#4fb66f', '#2b9c51'],
  };

  if (!mounted) return <div className="min-h-[150px]" />; // Tránh lỗi mismatch SSR

  return (
    <div className="github-calendar-wrapper">
      <GitHubCalendar
        username={GITHUB.username}
        blockSize={12}
        blockMargin={4}
        fontSize={12}
        theme={theme}
        renderBlock={(block, activity) => (
          <g
            data-tooltip-id="gh-tooltip"
            data-tooltip-content={`${activity.count} contributions on ${activity.date}`}
          >
            {block}
          </g>
        )}
      />

      <ReactTooltip
        id="gh-tooltip"
        noArrow={false}
        style={{
          fontSize: '12px',
          zIndex: 99
        }}
      />
    </div>
  );
}