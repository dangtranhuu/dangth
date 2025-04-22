// components/LangBadge.tsx
import githubColors from 'github-language-colors';
import React from 'react';

type LangBadgeProps = {
  lang: string;
};

export const LangBadge = ({ lang }: LangBadgeProps) => {
  const color = lang in githubColors ? githubColors[lang as keyof typeof githubColors] : '#ccc';

  return (
    <span className='repo-lang'
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: `1px solid ${color}`,
        borderRadius: '4px',
        padding: '2px 6px',
        fontSize: '0.8rem',
        marginRight: '6px',
        color,
      }}
    >
      {/* <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: color,
          marginRight: 6,
        }}
      /> */}
      {lang}
    </span>
  );
};
