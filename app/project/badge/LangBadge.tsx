import * as SIIcons from 'react-icons/si'; // all simple-icons
import githubColors from 'github-language-colors';
import React from 'react';

type LangBadgeProps = {
  lang: string;
};

const toIconName = (lang: string): string => {
  return 'Si' + lang
    .replace(/\+/g, 'plus')
    .replace(/\#/g, 'sharp')
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/\s+/g, '')
    .replace(/^\w/, (c) => c.toUpperCase()); // PascalCase
};

export const LangBadge = ({ lang }: LangBadgeProps) => {
  const color = lang in githubColors ? githubColors[lang as keyof typeof githubColors] : '#ccc';
  const iconName = toIconName(lang);
  const IconComponent = (SIIcons as any)[iconName];

  return (
    <span
      className="repo-lang"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: `1px solid ${color}`,
        borderRadius: '4px',
        padding: '4px 8px',
        fontSize: '0.85rem',
        marginRight: '6px',
        color,
        gap: '6px',
      }}
      title={lang}
    >
      {IconComponent && <IconComponent />}
      <span>{lang}</span>
    </span>

  );
};
