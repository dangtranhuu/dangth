// app/projects/page.tsx (ví dụ)

import React from "react";
import { searchReposByTopicAndUser } from '@/lib/github';
import { LangBadge } from './badge/LangBadge'

type RepoCardProps = {
  name: string;
  description: string | null;
  languages: string[];
  license?: string;
  lastUpdate: string;
  stars: number;
};

const RepoCard = ({
  name,
  description,
  languages,
  license,
  lastUpdate,
  stars
}: RepoCardProps) => {
  return (
    <div className="repo-card">
      <div className="repo-header">
        <h2 className="repo-name">{name}</h2>
        <span className="repo-stars">⭐ Star: {stars}</span>
      </div>
      <p className="repo-desc">{description || "Không có mô tả"}</p>
      <div className="repo-meta">
        {languages.map((lang) => (
          <LangBadge key={lang} lang={lang} />
        ))}
        {license && <span className="repo-license">{license}</span>}
        <span className="repo-updated">
          Cập nhật lúc {new Date(lastUpdate).toLocaleDateString("vi-VN")}
        </span>
      </div>
    </div>
  );
};


export default async function Projects() {
  const repos = await searchReposByTopicAndUser('dangtranhuu', 'featured', process.env.GITHUB_TOKEN!);

  return (
    <div className="max-w-3xl mx-auto py-12 container">
      <h1 className="text-2xl font-bold mb-6">📂 Featured Projects</h1>
      {repos.map((repo) => (
        <RepoCard key={repo.name} {...repo} />
      ))}
    </div>
  );
}
